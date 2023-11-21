import {model, Schema} from "mongoose";

const pricesSchema = new Schema(
    {
        rango: {type: String, required: true},
        modifiedAt: {type: Date, default: Date.now()},
        createdAt: {type: Date, default: Date.now()}
    }
)

const Prices = model("Prices", pricesSchema);

export default Prices;