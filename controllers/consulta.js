import Consulta from "../models/consulta.js";
import Admin from "../models/administrador.js";
import nodemailer from "nodemailer";

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
      // 1. Validar y obtener los datos de la solicitud
      const { nombre_con, correo_con, telefono_con, mensaje_con } = req.body;

      // 2. Crear una nueva consulta
      const nuevaConsulta = new Consulta({
        nombre_con,
        correo_con,
        telefono_con,
        mensaje_con,
      });

      await nuevaConsulta.save();

      // 3. Obtener datos del administrador para enviarle un correo de notificación
      const admin = await Admin.findOne();
      if (!admin) {
        return res.status(404).json({ error: "Administrador no encontrado" });
      }

      // 4. Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      // 5. Enviar correos (al cliente y al administrador)
      const fechaFormateada = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());

      // Correo al cliente (Confirmación de consulta)
      const enviarCorreoCliente = {
        from: process.env.userEmail,
        to: correo_con,
        subject: "Confirmación de consulta",
        html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                  <h2 style="color: #E53935;">Confirmación de su consulta</h2>
                  <p>Gracias por ponerse en contacto con nosotros. Hemos recibido su consulta y nos pondremos en contacto con usted pronto.</p>
                  <p><strong>Detalles de su consulta:</strong></p>
                  <p>Nombre: ${nombre_con}</p>
                  <p>Correo: ${correo_con}</p>
                  <p>Teléfono: ${telefono_con}</p>
                  <p>Mensaje: ${mensaje_con}</p>
                  <p>Fecha de creación: ${fechaFormateada}</p>
              </div>
          `,
      };

      // Correo al administrador (Notificación de nueva consulta)
      const enviarCorreoAdmin = {
        from: process.env.userEmail,
        to: admin.correo,
        subject: `Nueva consulta recibida de: ${nombre_con}`,
        html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                  <h2 style="color: #E53935;">Nueva consulta recibida</h2>
                  <p><strong>Detalles de la consulta:</strong></p>
                  <p>Nombre del cliente: ${nombre_con}</p>
                  <p>Correo del cliente: ${correo_con}</p>
                  <p>Teléfono del cliente: ${telefono_con}</p>
                  <p>Mensaje del cliente: ${mensaje_con}</p>
                  <p>Fecha de creación: ${fechaFormateada}</p>
              </div>
          `,
      };

      // 6. Enviar correos de forma asíncrona
      await Promise.all([
        transporter.sendMail(enviarCorreoCliente),
        transporter.sendMail(enviarCorreoAdmin),
      ]);

      // 7. Responder con la consulta creada
      res.json(nuevaConsulta);
    } catch (error) {
      console.error("Error en el proceso de consulta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
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
