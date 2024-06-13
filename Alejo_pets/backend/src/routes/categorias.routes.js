import { Router } from "express";
import { Categorias } from "../controllers/categoria.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const categorias = Router();

categorias.get("/categorias", validarToken, Categorias);

export default categorias;
