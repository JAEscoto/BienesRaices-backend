import mongoose from 'mongoose';
import express from 'express';

const db = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017/BienesRaices';

mongoose
  .connect(url)
  .then(() => console.log(`La DB funca en el puerto: ${port}`))
  .catch((error) => console.log(error));

export default db;
