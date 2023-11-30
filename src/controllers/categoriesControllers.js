import Categories from "../models/categoriesModel.js";

const getAllCategories = async(req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al obtener todos las categorias"});
    }
}

const createCategory = async(req, res) =>{
    const categoryExists = await Categories.findOne({rango: req.body.nombre});

    if (categoryExists) {
        return res.status(400).json({msg: "Categoria ya existente"});
    }

    try {
        const category = new Categories(req.body);
        await category.save();
        res.json({msg: "Categoria creado"});
    } catch (error) {
        console.log(error);
        console.log(req.body);
        res.status(500).json({msg: "Error al crear la categoria"});
    }
}

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
 
  if (!category) {
    return res.status(404).json({ msg: 'Categoria no encontrada' });
  }

  if (req.body) {
    Object.assign(category, req.body)
    category.modifiedAt = new Date();
  }

  try {
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Categories.findById(id);

    if (!category) {
        return res.status(404).json({ msg: 'Categoria no encontrado' });
    }

    try {
        await category.deleteOne();
        res.json({ msg: 'Categoria eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la categoria' });
    }
}

export {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}