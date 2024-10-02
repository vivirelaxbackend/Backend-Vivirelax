import { Router } from "express";
import httpTipoServicio from "../controllers/tipo_servicio.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los tipos de servicio
router.get(
  "/all",
  httpTipoServicio.getAll
);

// Obtener un tipo de servicio por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpTipoServicio.getPorId
);

// Registrar un nuevo tipo de servicio
router.post(
  "/registro",
  [
    check("nombre_tip", "Digite el nombre del tipo de servicio").not().isEmpty(),
    validarCampos,
  ],
  httpTipoServicio.registro
);

// Actualizar un tipo de servicio existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_tip", "Digite el nombre del tipo de servicio").not().isEmpty(),
    validarCampos,
  ],
  httpTipoServicio.editar
);

// Activar un tipo de servicio
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpTipoServicio.putActivar
);

// Desactivar un tipo de servicio
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpTipoServicio.putInactivar
);

export default router;
