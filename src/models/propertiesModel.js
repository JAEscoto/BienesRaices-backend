import { model, Schema } from 'mongoose';

const propertiesSchema = new Schema({
  userId: {type: Schema.Types.ObjectId,ref: 'users', required: true, default: null },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  habitaciones: { type: Number, required: true },
  estacionamiento: { type: Boolean, required: true },
  wc: { type: Number, required: true },
  calle: { type: String, required: true },
  latitud: { type: String, required: true },
  longitud: { type: String, required: true },
  imagen: { type: Buffer,required: true },
  publicado: { type: Boolean, required: true, defualt: false},
  enVenta: { type: Boolean, required: true },
  categoriaId: {type: String,ref: 'categories',required: true,default: null },
  precioId: { type: String, ref: 'prices', required: true, default: null },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() },
});

const Properties = model('Properties', propertiesSchema);

export default Properties;

