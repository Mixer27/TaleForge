import mongoose from "mongoose"
import { Schema } from "mongoose"
import { ArmorSchema, SkillLvlSchema, TalentSchema } from "./playerCharacterSheet"


const NpcStatsSchema = new Schema({
    weaponSkills: { type: Number, required: true, default: 0 },
    ballisticSkills: { type: Number, required: true, default: 0 },
    strength: { type: Number, required: true, default: 0 },
    toughness: { type: Number, required: true, default: 0 },
    agility: { type: Number, required: true, default: 0 },
    intelligence: { type: Number, required: true, default: 0 },
    willPower: { type: Number, required: true, default: 0 },
    fellowship: { type: Number, required: true, default: 0 },
    attacks: { type: Number, required: true, default: 0 },
    wounds: { type: Number, required: true, default: 0 },
    strengthBonus: { type: Number, required: true, default: 0 },
    toughnessBonus: { type: Number, required: true, default: 0 },
    magic: { type: Number, required: true, default: 0 },
    movement: { type: Number, required: true, default: 0 },
    insanityPoints: { type: Number, required: true, default: 0 },
    fatePoints: { type: Number, required: true, default: 0 },
})

const NpcSheetSchema = new Schema({
    name: {type: String, required: true},
    currentCareer: {type: String, required: true},
    previousCareers: {type: [String], default: []},
    race: { type: String, required: true},
    stats: {type: NpcStatsSchema, required: true},
    skills: {type: [SkillLvlSchema], default: []},
    talents: {type: [TalentSchema], default: []},
    armor: {type: ArmorSchema, required: true},
    weapons: {type: [String], default: []},
    equipment: {type: [String], default: []},
    wealth: {
        gc: Number,
        sh: Number,
        pn: Number,
    }
})

const NpcSheet = mongoose.model("NpcSheet", NpcSheetSchema)

export { NpcSheet };