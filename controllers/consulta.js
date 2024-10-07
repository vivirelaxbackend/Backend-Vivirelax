import Consulta from "../models/consulta.js";

const httpConsulta = {
  // Obtener todas las consultas
  getAll: async (req, res) => {
    try {
      const consultas = await Consulta.find();
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener una consulta por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const consulta = await Consulta.findById(id);
      if (!consulta)
        return res.status(404).json({ message: "Consulta no encontrada" });
      res.json(consulta);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener una consulta por correo
  getPorCorreo: async (req, res) => {
    try {
      const { correo } = req.params;
      const consultas = await Consulta.find({ correo_con: correo });
      if (!consultas || consultas.length === 0)
        return res
          .status(404)
          .json({ message: "No se encontraron consultas para este correo." });
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar una nueva consulta
  registro: async (req, res) => {
    try {
      const { nombre_con, correo_con, telefono_con, mensaje_con } = req.body;

      const consulta = new Consulta({
        nombre_con,
        correo_con,
        telefono_con,
        mensaje_con,
      });

      await consulta.save();
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar una consulta existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_con, correo_con, telefono_con, mensaje_con } = req.body;

      const consulta = await Consulta.findByIdAndUpdate(
        id,
        { nombre_con, correo_con, telefono_con, mensaje_con },
        { new: true }
      );

      if (!consulta)
        return res.status(404).json({ message: "Consulta no encontrada" });

      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar una consulta
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const consulta = await Consulta.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!consulta)
        return res.status(404).json({ message: "Consulta no encontrada" });
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Inactivar una consulta
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const consulta = await Consulta.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!consulta)
        return res.status(404).json({ message: "Consulta no encontrada" });
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpConsulta;
