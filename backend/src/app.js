import express from "express";
import cors from "cors";

import usuarioRouter from "./routes/usuarios.js";
import movimentacaoRouter from "./routes/movimentacao.js";
import inventarioRouter from "./routes/inventario.js";
import authRouter from "./routes/authRoutes.js"; 
import { auth } from "./middleware/auth.js";

export const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/ping", (req, res) => {
  res.send("pong");
});

/* 
 * 🔓 ROTAS PÚBLICAS (sem auth)
 * /register e /login JÁ estão definidas como públicas dentro do authRouter
 * então aqui basta montar sem proteger
*/
app.use("/auth", authRouter);
app.use("/mov",movimentacaoRouter);
app.use("/inventario", inventarioRouter);

/*
 * 🔐 ROTAS PROTEGIDAS
 * Tudo abaixo desse middleware exige token
 */
app.use(auth);

app.use(usuarioRouter);
