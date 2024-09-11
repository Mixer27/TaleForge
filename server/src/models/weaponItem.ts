import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ItemSchema } from "./item";

const WeaponItemSchema = new Schema({
    item: {type: ItemSchema, required: true},
    category: {type: String, required: true},
    range: {type: String, required: true},
    strength: { type: String, required: true },
    reload: {type: String, required: true},
    weaponFeatures: {type: String, required: true},
})

const WeaponItem = mongoose.model("WeaponItem", WeaponItemSchema);

export { WeaponItem, WeaponItemSchema };