import TipoServicio from "../models/tipo_servicio.js";

const httpTipoServicio = {
  // Obtener todos los tipos de servicio
  getAll: async (req, res) => {
    try {
      const tiposServicio = await TipoServicio.find();
      res.json(tiposServicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un tipo de servicio por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const tipoServicio = await TipoServicio.findById(id);
      if (!tipoServicio) return res.status(404).json({ message: "Tipo de servicio no encontrado" });
      res.json(tipoServicio);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Registrar un nuevo tipo de servicio
  registro: async (req, res) => {
    try {
      const { nombre_tip } = req.body;

      const tipoServicio = new TipoServicio({
        nombre_tip,
      });

      await tipoServicio.save();
      res.json(tipoServicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un tipo de servicio existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_tip } = req.body;

      const tipoServicio = await TipoServicio.findByIdAndUpdate(
        id,
        { nombre_tip },
        { new: true }
      );

      if (!tipoServicio) return res.status(404).json({ message: "Tipo de servicio no encontrado" });

      res.json(tipoServicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un tipo de servicio
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const tipoServicio = await TipoServicio.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!tipoServicio) return res.status(404).json({ message: "Tipo de servicio no encontrado" });
      res.json(tipoServicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un tipo de servicio
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const tipoServicio = await TipoServicio.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!tipoServicio) return res.status(404).json({ message: "Tipo de servicio no encontrado" });
      res.json(tipoServicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpTipoServicio;
