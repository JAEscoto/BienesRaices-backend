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

export {
    getAllCategories,
    createCategory
}