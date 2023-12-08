import { model, Schema } from 'mongoose';
import bcrypt from "bcrypt";
import { generarId } from "../helpers/tokens.js";

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now() 
    },
    modifiedAt: { 
        type: Date, 
        default: Date.now() 
    },
});

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.validatePassword = function (formPassword) {
    return bcrypt.compareSync(formPassword, this.password);
};

const Users = model('Users', usuarioSchema);

export default Users;
