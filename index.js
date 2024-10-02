import express from 'express';
import http from 'http';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import administrador from './routes/administrador.js';
import cliente from './routes/cliente.js';
import servicio from './routes/servicio.js';
import tipo_servicio from './routes/tipo_servicio.js';
import reserva from './routes/reserva.js'

const app = express();
const port= process.env.PORT

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use("/api/administrador", administrador);
app.use("/api/cliente", cliente);
app.use("/api/servicio", servicio);
app.use("/api/tipo-servicio", tipo_servicio);
app.use("/api/reserva", reserva);

const server = http.createServer(app)

mongoose.connect(`${process.env.mongoDB}`)
  .then(() => console.log('Conexión a mongoDB exitosa!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});