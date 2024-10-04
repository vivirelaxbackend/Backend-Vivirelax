import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
  nombre_serv: { type: String, required: true },
  descripcion: { type: String, required: true },
  galeria: [{ url: { type: String }, publicId: { type: String } }],
  precio: { type: Number, required: true },
  duracion: { type: String, required: true },
  beneficios: [{ descrip: { type: String, _id: false } }],
  idTipoServicio: { type: mongoose.Schema.Types.ObjectId, ref: "TipoServicio", required: true },
  estado: { type: Boolean, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Servicio", servicioSchema);
