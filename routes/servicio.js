import { Router } from "express";
import httpServicio from "../controllers/servicio.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los servicios
router.get(
  "/all",
  httpServicio.getAll
);

// Obtener un servicio por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpServicio.getPorId
);

// Obtener un servicio por nombre
router.get(
  "/nombre/:nombre",
  [
    check("nombre", "Ingrese un nombre válido").not().isEmpty(),
    validarCampos,
  ],
  httpServicio.getPorNombre
);

router.get('/tipo-servicio/:idTipoServicio',
  [
    check("idTipoServicio", "Ingrese una ID Tipo-Servicio válida").isMongoId(),
    validarCampos,
  ],
  httpServicio.getServiciosByTipoServicio);

// Registrar un nuevo servicio
router.post(
  "/registro",
  [
    check("nombre_serv", "Digite el nombre del servicio").not().isEmpty(),
    check("descripcion", "Digite la descripción del servicio").not().isEmpty(),
    check("galeria", "Digite la galería del servicio").optional(),
    check("precio", "Digite el precio del servicio").not().isEmpty(),
    check("duracion", "Digite la duración del servicio").not().isEmpty(),
    check("beneficios", "Agregue mínimo un beneficio").not().isEmpty(),
    check("idTipoServicio", "Ingrese una ID válida para el tipo de servicio").isMongoId(),
    validarCampos,
  ],
  httpServicio.registro
);

// Actualizar un servicio existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_serv", "Digite el nombre del servicio").not().isEmpty(),
    check("descripcion", "Digite la descripción del servicio").not().isEmpty(),
    check("galeria", "Digite la galería del servicio").optional(),
    check("precio", "Digite el precio del servicio").not().isEmpty(),
    check("duracion", "Digite la duración del servicio").not().isEmpty(),
    check("beneficios", "Agregue mínimo un beneficio").not().isEmpty(),
    check("idTipoServicio", "Ingrese una ID válida para el tipo de servicio").isMongoId(),
    validarCampos,
  ],
  httpServicio.editar
);

// Activar un servicio
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpServicio.putActivar
);

// Desactivar un servicio
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpServicio.putInactivar
);

export default router;
