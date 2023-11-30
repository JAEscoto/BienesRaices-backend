import Users from '../models/usersModel.js';

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

const createUser = async (req, res) => {
  const { email } = req.body;
  const userExist = await Users.findOne({ email });

  if (userExist) {
    const error = new Error('Email ya utilizado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new Users(req.body);
    await user.save();
    res.json({ msg: 'Usuario creado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al crear el usuario' });
  }
};

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
  createUser, 
  updateUser, 
  deleteUser, 
  getUserById 
};
