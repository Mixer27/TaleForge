import mongoose from "mongoose"
import { Schema } from "mongoose"
import { ArmorSchema, SkillLvlSchema, TalentSchema } from "./playerCharacterSheet"

const NpcStatsSchema = new Schema({
    weaponSkills: Number,
    ballisticSkills: Number,
    strength: Number,
    toughness: Number,
    agility: Number,
    intelligence: Number,
    willPower: Number,
    fellowship: Number,
    attacks: Number,
    wounds: Number,
    magic: Number,
    movement: Number,
    nsanityPoints: Number,
    fatePoints: Number,
})

const NpcSheetSchema = new Schema({
    name: String,
    currentCareer: String,
    previousCareers: [String],
    race: String,
    stats: NpcStatsSchema,
    skills: [SkillLvlSchema],
    talents: [TalentSchema],
    armor: ArmorSchema,
    weapons: [String],
    equipment: [String],
})

const NpcSheet = mongoose.model("NpcSheet", NpcSheetSchema)

export { NpcSheet };