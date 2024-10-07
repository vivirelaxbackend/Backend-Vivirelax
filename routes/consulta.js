import { Router } from "express";
import httpConsulta from "../controllers/consulta.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todas las reservas
router.get(
  "/all",
  httpConsulta.getAll
);

// Obtener una reserva por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpConsulta.getPorId
);

// Registrar una nueva reserva
router.post(
  "/registro",
  [
    check("nombre_con", "Digite el nombre").not().isEmpty(),
    check("correo_con", "Digite un correo electrónico válido").isEmail(),
    check("telefono_con", "Digite un número de teléfono válido").not().isEmpty(),
    check("mensaje_con", "Digite el mensaje de la reserva").not().isEmpty(),
    validarCampos,
  ],
  httpConsulta.registro
);

// Actualizar una reserva existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_con", "Digite el nombre de la reserva").not().isEmpty(),
    check("correo_con", "Digite un correo electrónico válido").isEmail(),
    check("telefono_con", "Digite un número de teléfono válido").not().isEmpty(),
    check("mensaje_con", "Digite el mensaje de la reserva").not().isEmpty(),
    validarCampos,
  ],
  httpConsulta.editar
);

// Activar una reserva
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpConsulta.putActivar
);

// Desactivar una reserva
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpConsulta.putInactivar
);

export default router;
