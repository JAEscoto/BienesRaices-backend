import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String, required: true },
    empresa: { type: String },
    fechaNacimiento: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    modifiedAt: {type: Date, default: Date.now()},
    createdAt: {type: Date, default: Date.now()}
  }
);

const Users = model('Users', usuarioSchema);

export default Users;
