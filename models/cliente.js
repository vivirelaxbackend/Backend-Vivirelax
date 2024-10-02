import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nombre_cli: { type: String, required: true },
    apellido_cli: { type: String, required: true },
    cedula_cli: { type: String, required: true, unique: true },
    edad_cli: { type: String, required: true },
    telefono_cli: { type: String, required: true },
    correo_cli: { type: String, required: true, unique: true },
    detalle_ult_vis: { type: String, required: false },
    estado: { type: Boolean, default: 1 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Cliente", clienteSchema);
