import mongoose from "mongoose";
import { Schema } from "mongoose";

const SpellSchema = new Schema({
    name:
    {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    castingNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    castingTime: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const Spell = mongoose.model("Spell", SpellSchema);

export { Spell };