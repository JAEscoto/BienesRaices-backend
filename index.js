import express from 'express';

import db from './src/config/db.js';

import usersRoutes from './src/routes/usersRoutes.js';
import pricesRouter from './src/routes/pricesRoutes.js'

const app = express();
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/prices', pricesRouter);

const port = 4000;
app.listen(port, () => [
    console.log(`Inicializando servidor en el puerto ${port}`)
])