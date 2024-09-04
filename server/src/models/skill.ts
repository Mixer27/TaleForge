import mongoose from "mongoose";
import { Schema } from "mongoose";

const SkillSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    relatedStatName: {
        type: String,
        enum: [
            'weaponSkills',
            'ballisticSkills',
            'strength',
            'toughness',
            'agility',
            'intelligence',
            'willPower',
            'fellowship',
        ],
        required: true,
    },
    advanced: {
        type: Boolean,
        required: true,
    },
    description: String,
})

const Skill = mongoose.model("Skill", SkillSchema);

export { Skill };