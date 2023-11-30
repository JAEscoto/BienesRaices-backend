import Prices from '../models/pricesModel.js';

const getAllPrices = async (req, res) => {
  try {
    const prices = await Prices.find();
    res.json(prices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al obtener todos los precios' });
  }
};

const createPrice = async (req, res) => {
  const priceExists = await Prices.findOne({ rango: req.body.rango });

  if (priceExists) {
    return res.status(400).json({ msg: 'Rango ya existente' });
  }

  try {
    const price = new Prices(req.body);
    await price.save();
    res.json({ msg: 'Precio creado' });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    res.status(500).json({ msg: 'Error al crear el precio' });
  }
};

const updatePrice = async (req, res) => {
  const { id } = req.params;
  const price = await Prices.findById(id);

  if (!price) {
    return res.status(404).json({ msg: 'Precio no encontrado' });
  }

  if (req.body.rango) {
    price.rango = req.body.rango;
    price.modifiedAt = new Date();
  }

  try {
    const updatedPrice = await price.save();
    res.json(updatedPrice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};

const deletePrice = async (req, res) => {
  const { id } = req.params;
  const price = await Prices.findById(id);

  if (!price) {
    return res.status(404).json({ msg: 'Precio no encontrado' });
  }

  try {
    await price.deleteOne();
    res.json({ msg: 'Precio eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el precio' });
  }
};

export { getAllPrices, createPrice, updatePrice, deletePrice };
