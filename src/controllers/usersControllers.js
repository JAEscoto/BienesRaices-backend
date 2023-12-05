import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';
import Users from '../models/usersModel.js';
import generateId from '../helpers/generateId.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: 'No hay registros para Users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al buscar el usuario' });
  }
};

const confirmarUser = async (req, res) =>{
  const { token } = req.params;

  try {
    // Verificar si el token es válido
    const usuario = await Users.findOne({ token }); // Cambia la lógica según el modelo de tu Usuario en MongoDB

    if (!usuario) {
      return res.status(400).json({
        mensaje: 'Hubo un error al confirmar tu cuenta. Intenta de nuevo.',
        error: true
      });
    }
    console.log(usuario)
    console.log(usuario.token)

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    return res.json({
      mensaje: 'La cuenta se confirmó correctamente.'
    });
  } catch (error) {
    console.error('Error al confirmar la cuenta:', error);
    return res.status(500).json({
      mensaje: 'Hubo un error al confirmar tu cuenta. Intenta de nuevo.',
      error: true
    });
  }
}

// const autenticarLogin = async (req, res)=>{
//   console.log("probando")
// }

const createUser = async (req, res) => {
  const { email } = req.body;
  const userExist = await Users.findOne({ email });

  if (userExist) {
    const error = new Error('Email ya utilizado en otra cuenta');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new Users(req.body);
    await user.save();

    emailRegistro({
      nombre: user.nombre,
      email: user.email,
      token: user.token
    });

    res.json({ msg: 'Usuario creado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al crear el usuario' });
  }
};

// const resetPassword = async (req, res) => {
//   const { email } = req.body;

//   // Validación manual de email
//   if (!isValidEmail(email)) {
//       return res.status(400).json({ mensaje: 'Eso no parece un email válido' });
//   }

//   // Buscar el usuario
//   const usuario = await Usuario.findOne({ email });

//   if (!usuario) {
//       return res.status(404).json({ mensaje: 'El Email no pertenece a ningún usuario' });
//   }

//   // Generar un token y enviar el email
//   usuario.token = generateId();
//   await usuario.save();

//   // Enviar un email
//   emailOlvidePassword({
//       email: usuario.email,
//       nombre: usuario.nombre,
//       token: usuario.token
//   });

//   // Enviar una respuesta al cliente
//   res.json({ mensaje: 'Hemos enviado un email con las instrucciones' });
// }

// function isValidEmail(email) {
//   return /\S+@\S+\.\S+/.test(email);
// }


const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  if (req.body) {
    Object.assign(user, req.body)
    user.modifiedAt = new Date();
  }

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  try {
    await user.deleteOne();
    res.json({ msg: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el usuario' });
  }
};

export { 
  getAllUsers,
  confirmarUser,
  createUser,
  // resetPassword,
  // autenticarLogin,
  updateUser, 
  deleteUser, 
  getUserById 
};
