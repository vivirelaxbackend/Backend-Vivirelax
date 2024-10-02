import { Router } from "express";
import httpCliente from "../controllers/cliente.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los clientes
router.get(
  "/all",
  httpCliente.getAll
);

// Obtener un cliente por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpCliente.getPorId
);

// Obtener un cliente por cedula_cli
router.get(
  "/cedula/:cedula",
  [
    check("cedula", "Ingrese una cédula válida").not().isEmpty(),
    validarCampos,
  ],
  httpCliente.getPorCedula
);

// Registrar un nuevo cliente
router.post(
  "/registro",
  [
    check("nombre_cli", "Digite el nombre del cliente").not().isEmpty(),
    check("apellido_cli", "Digite el apellido del cliente").not().isEmpty(),
    check("cedula_cli", "Digite la cédula del cliente").not().isEmpty(),
    check("edad_cli", "Digite la edad del cliente").not().isEmpty(),
    check("telefono_cli", "Digite el teléfono del cliente").not().isEmpty(),
    check("correo_cli", "Digite el correo del cliente").isEmail(),
    validarCampos,
  ],
  httpCliente.registro
);

// Actualizar un cliente existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_cli", "Digite el nombre del cliente").not().isEmpty(),
    check("apellido_cli", "Digite el apellido del cliente").not().isEmpty(),
    check("cedula_cli", "Digite la cédula del cliente").not().isEmpty(),
    check("edad_cli", "Digite la edad del cliente").not().isEmpty(),
    check("telefono_cli", "Digite el teléfono del cliente").not().isEmpty(),
    check("correo_cli", "Digite el correo del cliente").isEmail(),
    validarCampos,
  ],
  httpCliente.editar
);

// Activar un cliente
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpCliente.putActivar
);

// Desactivar un cliente
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpCliente.putInactivar
);

export default router;
