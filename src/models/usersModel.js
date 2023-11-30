import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import generateId from '../helpers/generateId.js';

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
    createdAt: {type: Date, default: Date.now()},
    token: {type: String, default: generateId()}
  }
);

usuarioSchema.pre("save", async function(next){
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

usuarioSchema.methods.validatePassword = async function(formPassword){
  return await bcrypt.compare(formPassword, this.password);
};

const Users = model('Users', usuarioSchema);

export default Users;
