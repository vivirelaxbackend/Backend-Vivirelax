import Cliente from "../models/cliente.js";

const httpCliente = {
  // Obtener todos los clientes
  getAll: async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un cliente por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findById(id);
      if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
      res.json(cliente);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener un cliente por cedula
  getPorCedula: async (req, res) => {
    try {
      const { cedula } = req.params;
      const cliente = await Cliente.findOne({ cedula_cli: cedula });
      if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo cliente
  registro: async (req, res) => {
    try {
      const { nombre_cli, apellido_cli, cedula_cli, edad_cli, telefono_cli, correo_cli, detalle_ult_vis } = req.body;

      const cliente = new Cliente({
        nombre_cli,
        apellido_cli,
        cedula_cli,
        edad_cli,
        telefono_cli,
        correo_cli,
        detalle_ult_vis,
      });

      await cliente.save();
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un cliente existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_cli, apellido_cli, cedula_cli, edad_cli, telefono_cli, correo_cli, detalle_ult_vis } = req.body;

      const cliente = await Cliente.findByIdAndUpdate(
        id,
        { nombre_cli, apellido_cli, cedula_cli, edad_cli, telefono_cli, correo_cli, detalle_ult_vis },
        { new: true }
      );

      if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un cliente
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un cliente
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpCliente;
