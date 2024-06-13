import { Router } from "express";
import { validarToken } from "../controllers/user.controller.js";
import { LisMascotas,RegMascota,eliMascota,ActuLrMascota,buscarMascota, cargarImagen, actualizarimagenes } from "../controllers/mascotas.controller.js";

const mascotas = Router();

mascotas.post("/RegistrarM", validarToken, cargarImagen,RegMascota);
mascotas.get("/ListarM", validarToken,LisMascotas);
mascotas.delete("/EliminarM/:id", validarToken, eliMascota);
mascotas.put("/ActualizarM/:id", validarToken, actualizarimagenes,ActuLrMascota);
mascotas.get("/BuscarM/:id", validarToken, buscarMascota);


export default mascotas;
