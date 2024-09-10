import mongoose from "mongoose";
import { Schema } from "mongoose";
// import { MoneySchema } from "./playerCharacterSheet";

const MoneySchema = new Schema({
    gc: { type: Number, default: 0 },
    sh: { type: Number, default: 0 },
    pn: { type: Number, default: 0 },
}, { _id: false });

const ItemSchema = new Schema({
    name: String,
    description: String,
    weight: Number,
    value: {type: MoneySchema, required: true},
    availability: String,
})

const Item = mongoose.model("Item", ItemSchema);

export { Item, ItemSchema };