import mongoose from "mongoose";

const tipoServicioSchema = new mongoose.Schema({
  nombre_tip: { type: String, required: true }, 
  estado: { type: Boolean, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TipoServicio", tipoServicioSchema);
