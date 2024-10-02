import Reserva from "../models/reserva.js";

const httpReserva = {
  // Obtener todas las reservas
  getAll: async (req, res) => {
    try {
      const reservas = await Reserva.find().populate('idServicio');
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener una reserva por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id).populate('idServicio');
      if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Registrar una nueva reserva
  registro: async (req, res) => {
    try {
      const { nombre_res, correo_res, telefono_res, mensaje_res, idServicio } = req.body;

      const reserva = new Reserva({
        nombre_res,
        correo_res,
        telefono_res,
        mensaje_res,
        idServicio,
      });

      await reserva.save();

      res.status(201).json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar una reserva existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_res, correo_res, telefono_res, mensaje_res, idServicio } = req.body;

      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { nombre_res, correo_res, telefono_res, mensaje_res, idServicio },
        { new: true }
      );

      if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar una reserva
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar una reserva
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReserva;
