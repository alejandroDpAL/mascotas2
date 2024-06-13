import { Router } from "express";
import { Genero } from "../controllers/genero.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const geeneros = Router();
 geeneros.get("/Listarg", validarToken, Genero);

export default geeneros;
