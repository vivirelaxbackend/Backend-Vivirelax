import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  nombre_res: { type: String, required: true },
  correo_res: { type: String, required: true },
  telefono_res: { type: String, required: true },
  mensaje_res: { type: String, required: true },
  idServicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio"},
  createdAt: { type: Date, default: Date.now },
  estado: { type: Boolean, default: 1 }
});

export default mongoose.model("Reserva", reservaSchema);
