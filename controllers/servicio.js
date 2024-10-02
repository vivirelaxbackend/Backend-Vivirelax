import Servicio from "../models/servicio.js";

const httpServicio = {
  // Obtener todos los servicios
  getAll: async (req, res) => {
    try {
      const servicios = await Servicio.find();
      res.json(servicios);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un servicio por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findById(id);
      if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });
      res.json(servicio);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener un servicio por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const servicios = await Servicio.find({ nombre_serv: nombre });
      res.json(servicios);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo servicio
  registro: async (req, res) => {
    try {
      const { nombre_serv, descripcion, galeria, beneficios, idTipoServicio } = req.body;

      const servicio = new Servicio({
        nombre_serv,
        descripcion,
        galeria,
        beneficios,
        idTipoServicio,
      });

      await servicio.save();

      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un servicio existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_serv, descripcion, galeria, beneficios, idTipoServicio } = req.body;

      const servicio = await Servicio.findByIdAndUpdate(
        id,
        { nombre_serv, descripcion, galeria, beneficios, idTipoServicio },
        { new: true }
      );

      if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });

      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un servicio
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un servicio
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpServicio;
