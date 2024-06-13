import { Router } from "express";
import { UsuarioNuevo, validar } from "../controllers/user.controller.js";

const Usuario = Router();

Usuario.post("/login", validar);
Usuario.post("/Registrar", UsuarioNuevo);

export default Usuario;
