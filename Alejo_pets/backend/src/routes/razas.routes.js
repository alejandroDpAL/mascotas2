import { Router } from "express";
import { Razas } from "../controllers/raza.controller.js";
import { validarToken } from "../controllers/user.controller.js";

const razas = Router();

razas.get("/razas", validarToken, Razas);

export default razas;
