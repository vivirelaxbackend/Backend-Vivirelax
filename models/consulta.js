import mongoose from "mongoose";

const consultaSchema = new mongoose.Schema({
  nombre_con: { type: String, required: true },
  correo_con: { type: String, required: true },
  telefono_con: { type: String, required: true },
  mensaje_con: { type: String, required: true },
  estado: { type: Boolean, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Consulta", consultaSchema);
