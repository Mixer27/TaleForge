import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ItemSchema } from "./item";

const ArmorItemSchema = new Schema({
    item: {type: ItemSchema, required: true},
    coverLocation: [String],
    armor: {type: Number, required: true, default: 0, min: 0},
})

const ArmorItem = mongoose.model("ArmorItem", ArmorItemSchema);

export { ArmorItem, ArmorItemSchema };