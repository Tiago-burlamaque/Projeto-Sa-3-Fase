import { Router } from "express";


export const usuarioRouter = Router()

usuarioRouter.get('/usuarios', usuarioController.getTodosUsuarios)

usuarioRouter.get('/usuarios', usuarioController.getPorEmail)

usuarioRouter.post('/usuarios', usuarioController.criaUsuario)

usuarioRouter.put('/usuarios', usuarioController.atualizarUsuario)

usuarioRouter.delete('/usuarios', usuarioController.deletarsUsuario)