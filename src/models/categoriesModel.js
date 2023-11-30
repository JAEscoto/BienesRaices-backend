import {model, Schema} from "mongoose";

const categoriesSchema = new Schema(
    {
        nombre: {type: String, required: true},
        modifiedAt: {type: Date, default: Date.now()},
        createdAt: {type: Date, default: Date.now()}
    }
)

const Categories = model("Categories", categoriesSchema);

export default Categories;