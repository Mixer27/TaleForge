import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Skill } from "./skill";
// import { Talent } from "./talent";
import {Race, Gender, SkillLvl, StatName} from "../utils/enums"


const ArmorSchema = new Schema({
    head: { type: Number, required: true, default: 0 },
    l_arm: { type: Number, required: true, default: 0 },
    r_arm: { type: Number, required: true, default: 0 },
    body: { type: Number, required: true, default: 0 },
    l_leg: { type: Number, required: true, default: 0 },
    r_leg: { type: Number, required: true, default: 0 },
}, { _id: false });

const PlayerStatSchema = new Schema({
    name: { type: String, enum: Object.values(StatName), required: true},
    starting: { type: Number, required: true, default: 0 },
    advance: { type: Number, required: true, default: 0 },
    current: { type: Number, required: true, default: 0 },
}, { _id: false });
const SingleStatSchema = new Schema({
    name: { type: String, enum: Object.values(StatName), required: true},
    current: { type: Number, required: true, default: 0 },
})

const PlayerStatsSchema: Schema = new Schema({
    weaponSkills: PlayerStatSchema,
    ballisticSkills: PlayerStatSchema,
    strength: PlayerStatSchema,
    toughness: PlayerStatSchema,
    agility: PlayerStatSchema,
    intelligence: PlayerStatSchema,
    willPower: PlayerStatSchema,
    fellowship: PlayerStatSchema,
    attacks: PlayerStatSchema,
    wounds: PlayerStatSchema,
    magic: PlayerStatSchema,
    movement: PlayerStatSchema,
    strengthBonus: SingleStatSchema,
    toughnessBonus: SingleStatSchema,
    insanityPoints: SingleStatSchema,
    fatePoints: SingleStatSchema,
}, { _id: false })

const SkillLvlSchema = new Schema({
    skill: {
        type: Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
    },
    lvl: {
        type: String,
        enum: Object.values(SkillLvl),
        required: true,
    },
}, { _id: false })

const TalentSchema = new Schema({
    talent: {
        type: Schema.Types.ObjectId,
        ref: 'Talent',
        required: true,
    }
}, { _id: false })

const SpellSchema = new Schema({
    spell: {
        type: Schema.Types.ObjectId,
        ref: 'Spell',
        required: true,
    }
}, { _id: false })

const PlayerCharacterSchema = new Schema({
    owner_id: { type: Schema.Types.ObjectId, required: true, index: true },
    session_id: { type: Schema.Types.ObjectId, required: true, index: true },
    name: { type: String, required: true },
    race: {
        type: String,
        enum: Object.values(Race),
    },
    currentCareer: String,
    PreviousCareers: [String],
    age: Number,
    gender: {
        type: String,
        enum: Object.values(Gender),
    },
    eyeColor: { type: String, default: "" },
    hairColor: { type: String, default: "" },
    starSign: { type: String, default: "" },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    numOfSiblings: { type: Number, default: 0 },
    birthplace: { type: String, default: "" },
    distinguishMarks: { type: String, default: "" },
    backstory: { type: String, default: "" },
    armor: { type: ArmorSchema, required: true },
    stats: { type: PlayerStatsSchema, required: true },
    skills: { type: [SkillLvlSchema], default: [] },
    talents: { type: [TalentSchema], default: [] },
    spells: { type: [SpellSchema], default: [] },
    wealth: {
        gc: { type: Number, default: 0 },
        sh: { type: Number, default: 0 },
        pn: { type: Number, default: 0 },
    }
})

const PlayerCharacterSheet = mongoose.model("PlayerCharacterSheet", PlayerCharacterSchema);

export { ArmorSchema, SkillLvlSchema, TalentSchema, PlayerCharacterSheet, Skill};