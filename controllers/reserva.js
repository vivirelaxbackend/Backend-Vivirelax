import Reserva from "../models/reserva.js";
import Admin from "../models/administrador.js";
import Servicio from "../models/servicio.js";
import nodemailer from "nodemailer";

const httpReserva = {
  // Obtener todas las reservas
  getAll: async (req, res) => {
    try {
      const reservas = await Reserva.find().populate("idServicio");
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener una reserva por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id).populate("idServicio");
      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  registro: async (req, res) => {
    try {
      // 1. Validar y obtener datos de la solicitud
      const {
        nombre_res,
        correo_res,
        telefono_res,
        mensaje_res,
        fecha_res,
        idServicio,
      } = req.body;

      // 2. Crear una nueva reserva
      const nuevaReserva = new Reserva({
        nombre_res,
        correo_res,
        telefono_res,
        mensaje_res,
        fecha_res,
        idServicio,
      });

      await nuevaReserva.save();

      // 3. Buscar el servicio para obtener detalles (si es necesario enviar al cliente)
      const servicio = await Servicio.findById(idServicio);

      if (!servicio) {
        return res.status(404).json({ error: "Servicio no encontrado" });
      }

      // 4. Obtener datos del administrador para enviarle un correo de notificación
      const admin = await Admin.findOne();
      if (!admin) {
        return res.status(404).json({ error: "Administrador no encontrado" });
      }

      // 5. Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      const fechaResParsed = new Date(fecha_res + "T00:00:00"); // Forzamos el tiempo a medianoche local
      const fechaReservaFormateada = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(fechaResParsed);

      // 6. Enviar correos (solo al cliente y al administrador)
      const fechaFormateada = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());

      // Correo del cliente
      const enviarCorreoCliente = {
        from: process.env.userEmail,
        to: correo_res,
        subject: "Confirmación de reserva para el servicio",
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #E53935;">
                        ${servicio.nombre_serv}
                    </h2>
                    <p>Su reserva ha sido confirmada. Nos pondremos en contacto con usted pronto.</p>
                    <p style="font-size: 14px;color: #000000;font-weight: bold"><strong>Detalles:</strong></p>
                    <p>Nombre: ${nombre_res}</p>
                    <p>Correo: ${correo_res}</p>
                    <p>Teléfono: ${telefono_res}</p>
                    <p>Fecha Reserva: ${fechaReservaFormateada}</p>
                    <p>Mensaje: ${mensaje_res}</p>
                    <p>Enviada el ${fechaFormateada}</p>
                </div>
            `,
      };

      // Correo del administrador
      const enviarCorreoAdmin = {
        from: process.env.userEmail,
        to: admin.correo,
        subject: `Nueva reserva para el servicio: ${servicio.nombre_serv}`,
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #E53935;">
                        Nueva reserva confirmada para el servicio: ${servicio.nombre_serv}
                    </h2>
                    <p style="font-size: 14px;color: #000000;font-weight: bold">Detalles de la reserva:</p>
                    <p>Nombre Cliente: ${nombre_res}</p>
                    <p>Correo Cliente: ${correo_res}</p>
                    <p>Teléfono Cliente: <a href="https://wa.me/57${telefono_res}">${telefono_res}</a></p>
                    <p>Fecha Reserva: ${fechaReservaFormateada}</p>
                    <p>Mensaje del Cliente: ${mensaje_res}</p>
                    <p>Enviada el ${fechaFormateada}</p>
                </div>
            `,
      };

      // Enviar correos de forma asíncrona
      await Promise.all([
        transporter.sendMail(enviarCorreoCliente),
        transporter.sendMail(enviarCorreoAdmin),
      ]);

      // 7. Responder con la reserva creada
      res.json(nuevaReserva);
    } catch (error) {
      console.error("Error en el proceso de reserva:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Actualizar una reserva existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nombre_res,
        correo_res,
        telefono_res,
        mensaje_res,
        fecha_res,
        idServicio,
      } = req.body;

      const reserva = await Reserva.findByIdAndUpdate(
        id,
        {
          nombre_res,
          correo_res,
          telefono_res,
          fecha_res,
          mensaje_res,
          idServicio,
        },
        { new: true }
      );

      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Redirigir a chat de WhatsApp
  contactanos: async (req, res) => {
    try {
      const administrador = await Admin.findOne(); // Buscar el administrador
      if (!administrador || !administrador.telefono) {
        return res.status(404).json({
          error: "No se encontró el administrador o su número de teléfono",
        });
      }

      const numeroWhatsApp = `57${administrador.telefono}`;

      const mensajeWhatsApp =
        "Hola, me gustaría solicitar más información sobre los servicios y el catálogo que ofrece su SPA. ¿Podrían proporcionarme detalles, por favor?";

      const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

      // Return the WhatsApp link as a JSON response
      res.json({ link: enlaceWhatsApp });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      ).populate("idServicio");
      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });
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
      ).populate("idServicio");
      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReserva;
