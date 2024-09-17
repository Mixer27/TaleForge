import mongoose from "mongoose";
import { Schema } from "mongoose";
// import { MoneySchema } from "./playerCharacterSheet";

const MoneySchema = new Schema({
    gc: { type: Number, default: 0 },
    sh: { type: Number, default: 0 },
    pn: { type: Number, default: 0 },
}, { _id: false });

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    weight: { type: Number, required: true, min: 0 },
    value: { type: MoneySchema, required: true },
    availability: { type: String, required: true },
})

const Item = mongoose.model("Item", ItemSchema);

export { Item, ItemSchema };