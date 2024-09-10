import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ItemSchema } from "./item";

const WeaponItemSchema = new Schema({
    item: ItemSchema,
    category: String,
    range: String,
    strength: String,
    weaponFeature: String,
})

const WeaponItem = mongoose.model("WeaponItem", WeaponItemSchema);

export { WeaponItem };