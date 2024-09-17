import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Skill } from "./skill";
// import { Talent } from "./talent";
import { Race, Gender, SkillLvl, StatName } from "../utils/enums"
import { ItemSchema } from "./item";
import { WeaponItemSchema } from "./weaponItem";
import { ArmorItemSchema } from "./armorItem";

const MoneySchema = new Schema({
    gc: { type: Number, default: 0, min: 0, },
    sh: { type: Number, default: 0, min: 0 },
    pn: { type: Number, default: 0, min: 0 },
}, { _id: false, validateBeforeSave: true });

const ArmorSchema = new Schema({
    head: { type: ArmorItemSchema, required: true },
    torso: { type: ArmorItemSchema, required: true },
    arms: { type: ArmorItemSchema, required: true },
    legs: { type: ArmorItemSchema, required: true },
}, { _id: false });

const PlayerStatSchema = new Schema({
    name: { type: String, enum: Object.values(StatName), required: true },
    starting: { type: Number, required: true, default: 0, min: 0 },
    advance: { type: Number, required: true, default: 0, min: 0 },
    current: { type: Number, required: true, default: 0, min: 0 },
}, { _id: false });
const SingleStatSchema = new Schema({
    name: { type: String, enum: Object.values(StatName), required: true },
    current: { type: Number, required: true, default: 0, min: 0 },
}, { _id: false });

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
    name: { type: String, required: true, minLength: [3, "Name must have at least 3 characters"] },
    race: {
        type: String,
        enum: Object.values(Race),
        required: true,
    },
    currentCareer: { type: String, requiredd: true },
    PreviousCareers: { type: [String], required: true },
    age: { type: Number, required: true, default: 0, min: 0 },
    gender: {
        type: String,
        enum: Object.values(Gender),
        required: true
    },
    eyeColor: { type: String, default: "", required: true },
    hairColor: { type: String, default: "", required: true },
    starSign: { type: String, default: "", required: true },
    weight: { type: Number, default: 0, required: true, min: 0 },
    height: { type: Number, default: 0, required: true, min: 0 },
    numOfSiblings: { type: Number, default: 0, required: true, min: 0 },
    birthplace: { type: String, default: "", required: true },
    distinguishMarks: { type: String, default: "", required: true },
    scarsAndWounds: { type: String, default: "", required: true },
    mentalDisorders: { type: String, default: "", required: true },
    backstory: { type: String, default: "", required: true },
    religion: { type: String, default: "", required: true },
    stats: { type: PlayerStatsSchema, required: true },
    skills: { type: [SkillLvlSchema], default: [], required: true },
    talents: { type: [TalentSchema], default: [], required: true },
    spells: { type: [SpellSchema], default: [], required: true },
    wealth: { type: MoneySchema, required: true },
    items: { type: [ItemSchema], required: true, default: [] },
    weapons: { type: [WeaponItemSchema], default: [], required: true },
    armor: { type: ArmorSchema, required: true }
})

const PlayerCharacterSheet = mongoose.model("PlayerCharacterSheet", PlayerCharacterSchema);

export { ArmorSchema, SkillLvlSchema, TalentSchema, PlayerCharacterSheet, Skill, MoneySchema };