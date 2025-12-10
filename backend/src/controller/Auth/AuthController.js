// Path: src/controller/Auth/AuthController.js

import bcrypt from "bcrypt";
import { prismaClient } from "../../../prisma/prisma.js";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefresh,
} from "../../utils/jwt.js";


class AuthController {
    constructor() { }

    async register(req, res) {
        try {
            const { email, password, nome, telefone, rg, cpf, data_nascimento, endereco } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email e password são obrigatórios" });
            }

            const existingUser = await prismaClient.usuario.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(409).json({ error: "Usuário já existe" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prismaClient.usuario.create({
                data: {
                    email,
                    password: hashedPassword,
                    nome,
                    telefone,
                    rg,
                    cpf,
                    data_nascimento,
                    endereco,
                },
                select: {
                    id: true,
                    email: true,
                    nome: true,
                },
            });

            // 🔥 Gerar tokens após registro
            const accessToken = signAccessToken({
                userId: user.id,
                email: user.email,
                nome: user.nome,
            });

            const refreshToken = signRefreshToken({
                userId: user.id,
                email: user.email,
                nome: user.nome,
            });

            // Salvar refresh token no banco
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);

            await prismaClient.token.create({
                data: {
                    token: refreshToken,
                    type: "refresh",
                    usuarioId: user.id,
                    expiresAt,
                },
            });

            return res.status(201).json({
                message: "Usuário criado com sucesso",
                user,
                accessToken,
                refreshToken
            });

        } catch (error) {
            console.error("Erro no registro:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }


    async login(req, res) {
    try {
        console.log("REQ BODY:", req.body);

        // aceita "senha" do front e "password" se vier assim
        const { email, senha, password } = req.body;
        const pw = senha || password;

        if (!email || !pw) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        const user = await prismaClient.usuario.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        console.log("password recebido:", pw);
        console.log("hash do banco:", user.password);

        const passwordMatch = await bcrypt.compare(pw, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const accessToken = signAccessToken({
            userId: user.id,
            email: user.email,
            nome: user.nome,
        });

        const refreshToken = signRefreshToken({
            userId: user.id,
            email: user.email,
            nome: user.nome,
        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prismaClient.token.create({
            data: {
                token: refreshToken,
                type: "refresh",
                usuarioId: user.id,
                expiresAt,
            },
        });

        return res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                nome: user.nome,
            },
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}


    async refresh(
        req,
        res
    ) {
        const { refreshToken } = req.body;
        const storedRefreshToken = await prismaClient.token.findFirst({
            where: { token: refreshToken },
        });
        if (
            !storedRefreshToken ||
            storedRefreshToken.revoked ||
            storedRefreshToken.expiresAt < new Date()
        )
            return res.status(401).json({ error: "invalid refresh token" });

        try {
            const payload = verifyRefresh(refreshToken);
            const accessToken = signAccessToken({
                userId: payload.userId,
                email: payload.email,
                nome: payload.nome,
            });
            return res.json({ accessToken });
        } catch {
            return res.status(401).json({ error: "invalid refresh token" });
        }
    };

    async logout(
        req,
        res
    ) {
        const { refreshToken } = req.body;
        try {
            const storedRefreshToken = await prismaClient.token.findFirst({
                where: { token: refreshToken },
            });
            if (
                !storedRefreshToken ||
                storedRefreshToken.revoked ||
                storedRefreshToken.expiresAt < new Date()
            )
                return res.status(401).json({ error: "invalid refresh token" });

            await prismaClient.token.updateMany({
                where: { id: storedRefreshToken?.id ?? 0 },
                data: { revoked: true },
            });
        } catch (error) {
            res.status(400).json(error)
        }

        return res.status(200).json("Usuário deslogado!");

    }
}


export const authController = new AuthController();