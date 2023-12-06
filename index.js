import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import db from './src/config/db.js';

import usersRoutes from './src/routes/usersRoutes.js';
import pricesRouter from './src/routes/pricesRoutes.js';
import categoriesRoutes from './src/routes/categoriesRoutes.js';
import propertiesRoutes from './src/routes/propertiesRoutes.js';
import messagesRoutes from './src/routes/messagesRoutes.js'


const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api/users', usersRoutes);
app.use('/api/prices', pricesRouter);
app.use('/api/categories', categoriesRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/messages', messagesRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => [
  console.log(`Inicializando servidor en el puerto ${port}`),
]);
