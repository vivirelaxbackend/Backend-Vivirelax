import { Router } from "express";
import httpReserva from "../controllers/reserva.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todas las reservas
router.get(
  "/all",
  httpReserva.getAll
);

// Obtener una reserva por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReserva.getPorId
);

// Registrar una nueva reserva
router.post(
  "/registro",
  [
    check("nombre_res", "Digite el nombre de la reserva").not().isEmpty(),
    check("correo_res", "Digite un correo electrónico válido").isEmail(),
    check("telefono_res", "Digite un número de teléfono válido").not().isEmpty(),
    check("mensaje_res", "Digite el mensaje de la reserva").not().isEmpty(),
    check("idServicio", "Ingrese una ID válida para el servicio").isMongoId(),
    validarCampos,
  ],
  httpReserva.registro
);

// Actualizar una reserva existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_res", "Digite el nombre de la reserva").not().isEmpty(),
    check("correo_res", "Digite un correo electrónico válido").isEmail(),
    check("telefono_res", "Digite un número de teléfono válido").not().isEmpty(),
    check("mensaje_res", "Digite el mensaje de la reserva").not().isEmpty(),
    check("idServicio", "Ingrese una ID válida para el servicio").isMongoId(),
    validarCampos,
  ],
  httpReserva.editar
);

// Activar una reserva
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReserva.putActivar
);

// Desactivar una reserva
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReserva.putInactivar
);

export default router;
