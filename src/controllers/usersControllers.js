import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';
import Users from '../models/usersModel.js';
import { generarJWT, generarId } from '../helpers/tokens.js';


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

const autenticar = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if(!user) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    if(!user.confirmado) {
      return res.status(400).json({ msg: 'Tu cuenta no ha sido confirmada' });
    }

    if(!user.validatePassword(password)) {
      return res.status(400).json({ msg: 'El password es incorrecto' });
    }

    const token = generarJWT({ id: user._id, nombre: user.nombre });

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
  }
}

const confirmarUser = async (req, res) =>{
  try {
    const { token } = req.params;

    // Verificar si el token es válido
    const user = await Users.findOne({ token }); // Cambia la lógica según el modelo de tu Usuario en MongoDB

    if (!user) {
      res.status(400).json({ msg: 'Hubo un error al confirmar tu cuenta. Intenta de nuevo' });
    }

    // Confirmar la cuenta
    user.token = null;
    user.confirmado = true;
    await user.save();

    res.json({ msg: 'La cuenta se confirmó correctamente' });
  } catch (error) {
    console.error('Error al confirmar la cuenta:', error);
    return res.status(500).json({ msg: 'Hubo un error al confirmar tu cuenta. Intenta de nuevo' });
  }
}

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

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'El email no pertenece a niguna cuenta' });
    }

    user.token = generarId();
    await user.save();

    emailOlvidePassword({
      email: user.email,
      nombre: user.nombre,
      token: user.token
    });

    res.json({ msg: 'Hemos enviado un email con las instrucciones' });
  } catch (err) {
    console.log(err);
  }
}

const nuevoPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await Users.findOne({ token });

    user.password = password;
    user.token = null;

    await user.save();

    res.json({ msg: 'Password guardado correctamente' });
  } catch (err) {
    console.log(err);
  }
}


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
  autenticar,
  resetPassword,
  nuevoPassword,
  createUser,
  updateUser, 
  deleteUser, 
  getUserById 
};
