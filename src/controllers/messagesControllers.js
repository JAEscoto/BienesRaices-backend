import Messages from '../models/messagesModel.js'
import Properties from '../models/propertiesModel.js'
import Users from '../models/usersModel.js'

const getAllMessages = async (req, res) => {
    try {
      const message = await Messages.find();
      res.json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al obtener todos los mensajes' });
    }
  };

const getMessagesById = async(req, res) => {
    try {
        const { id } = req.params;
        const message = await Messages.findById(id);

        if (!message) {
            return res.status(404).json({ msg: 'Mensaje no encontrado' });
        }
        
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al buscar el mensaje' });
    }
}

const getMessageByPropertyId = async(req, res) => {
    try {
        const {id} = req.params;
        const filter = {propertyId: id}
        const message = await Messages.find(filter)
        
        if (!message) {
            return res.status(404).json({ msg: "Propiedad no encontrada" });
        }

        console.log(message)

        res.json(message)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al buscar los mensajes' });
    }
}

const createMessage = async(req, res) => {
    try {
        const message = new Messages(req.body);

        const user = await Users.findById(message.userId);
        const property = await Properties.findById(message.propertyId);

        if (!user) {
            return res.status(404).json({msg: "Usuario no encontrado"});
        }if (!property) {
            return res.status(404).json({msg: "Propiedad no encontrado"});
        }

        await message.save();

        res.json({ msg: 'Mensaje creado' });

    } catch (error) {
        console.log(error);
        console.log(req.body);
        res.status(500).json({ msg: 'Error al crear el Mensaje' });
    }
}

const updateMessage = async(req, res) => {
    const { id } = req.params;
    const message = await Messages.findById(id);
  
    if (!message) {
      return res.status(404).json({ msg: 'Mensaje no encontrado' });
    }
  
    if (req.body) {
        Object.assign(message, req.body)
        message.modifiedAt = new Date();
      }
  
    try {
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al actualizar el mensaje' });
    }
}

const deleteMessage = async(req, res) => {
    const { id } = req.params;
    const message = await Messages.findById(id);
  
    if (!message) {
      return res.status(404).json({ msg: 'Mensaje no encontrado' });
    }
  
    try {
      await message.deleteOne();
      res.json({ msg: 'Mensaje eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al eliminar el mensaje' });
    }
}

export{
    getAllMessages,
    getMessagesById,
    getMessageByPropertyId,
    createMessage,
    updateMessage,
    deleteMessage
}