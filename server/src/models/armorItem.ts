import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ItemSchema } from "./item";

const ArmorItemSchema = new Schema({
    item: ItemSchema,
    coverLocation: [String],
    armor: Number,
})

const ArmorItem = mongoose.model("ArmorItem", ArmorItemSchema);

export { ArmorItem };