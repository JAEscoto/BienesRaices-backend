import mongoose from 'mongoose';

const port = 3000;

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DB_URL);
      console.log(`Conectado a la base de datos en el puerto ${port}`);
  } catch (error) {
      console.log('ERROR');
      console.log(error);
      process.exit(1); 
  }
}

export default connectDB;
