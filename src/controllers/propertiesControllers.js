import Categories from '../models/categoriesModel.js';
import Prices from '../models/pricesModel.js';
import Properties from '../models/propertiesModel.js';
import Users from '../models/usersModel.js';


import { writeFileSync } from 'fs';

const getAllProperties = async (req, res) => {
  try {
    const properties = await Properties.find().lean();

    for(let i=0, len=properties.length; i < len; i++) {
      let property = properties[i];

      const user = await Users.findById(property.userId).select('nombre primerApellido');
      properties[i].userName = user.nombre + ' ' + user.primerApellido;
    }

    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: 'No se han registrado propiedades' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Properties.findById(id);

    if (!property) {
      return res.status(404).json({ msg: 'Propiedad no encontrada' });
    }

    writeFileSync('./propiedad.jpg', property.imagen);

    res.json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al buscar la propiedad' });
  }
};

// const getPropertiesByUserId = async (req, res) =>{

//   try {
//     const {id} = req.params;
//     const filter = {
//       userId: id
//     }

//     const properties = await Properties.find(filter)

//     if (!properties) {
//       return res.status(404).json({ msg: "Propiedades no encontradas" });
//     }

//     writeFileSync('./propiedad.jpg', properties.imagen);


//     res.json(properties)
//   } catch (error) {
//     res.status(500).json({ msg: 'Error al buscar las propiedades' });
//   }
  
// }

const addProperty = async (req, res) => {
  const {
    userId,
    titulo,
    descripcion, 
    habitaciones, 
    estacionamiento, 
    wc, 
    calle, 
    latitud, 
    longitud, 
    imagen, 
    publicado,
    enVenta,
    categoriaId,
    precioId} = req.body;

  const category = await Categories.findById(categoriaId);
  const price = await Prices.findById(precioId);
  const user = await Users.findById(userId);

  if (!user) {
    return res.status(404).json({msg: "Usuario no encontrado"});
  }if (!price) {
    return res.status(404).json({msg: "Precio no encontrado"});
  }if(!category){
    return res.status(404).json({msg: "Categoria no encontrada"});
  }

  try {
    

    var bindata = Buffer.from(imagen.split(",")[1], "base64");

    const property = new Properties({
      userId,
      titulo,
      descripcion, 
      habitaciones, 
      estacionamiento, 
      wc, 
      calle, 
      latitud, 
      longitud, 
      imagen: bindata, 
      publicado,
      enVenta,
      categoriaId,
      precioId
    })

    await property.save();
    
    res.json({ msg: 'Propiedad registrada correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al registrar la propiedad' });
  }
};

const updateProperty = async(req, res) => {
  const { id } = req.params;
  const property = await Properties.findById(id);

  if (!property) {
    return res.status(404).json({ msg: 'Propiedad no encontrada' });
  }

  if (req.body) {
    Object.assign(property, req.body)
    property.modifiedAt = new Date();
  }

  try {
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la propiedad' });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const property = await Properties.findById(id);

  if (!property) {
    return res.status(404).json({ msg: 'Propiedad no encontrada' });
  }

  try {
    await property.deleteOne();
    res.json({ msg: 'Propiedad eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el usuario' });
  }
};

export { 
  getAllProperties, 
  getPropertyById, 
  // getPropertiesByUserId,
  addProperty, 
  updateProperty,
  deleteProperty
};
