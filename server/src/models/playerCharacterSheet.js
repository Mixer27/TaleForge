"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneySchema = exports.Skill = exports.PlayerCharacterSheet = exports.TalentSchema = exports.SkillLvlSchema = exports.ArmorSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var skill_1 = require("./skill");
Object.defineProperty(exports, "Skill", { enumerable: true, get: function () { return skill_1.Skill; } });
// import { Talent } from "./talent";
var enums_1 = require("../utils/enums");
var item_1 = require("./item");
var weaponItem_1 = require("./weaponItem");
var armorItem_1 = require("./armorItem");
var MoneySchema = new mongoose_2.Schema({
    gc: { type: Number, default: 0 },
    sh: { type: Number, default: 0 },
    pn: { type: Number, default: 0 },
}, { _id: false });
exports.MoneySchema = MoneySchema;
// const ArmorSchema = new Schema({
//     head: { type: Number, required: true, default: 0 },
//     l_arm: { type: Number, required: true, default: 0 },
//     r_arm: { type: Number, required: true, default: 0 },
//     body: { type: Number, required: true, default: 0 },
//     l_leg: { type: Number, required: true, default: 0 },
//     r_leg: { type: Number, required: true, default: 0 },
// }, { _id: false });
var ArmorSchema = new mongoose_2.Schema({
    head: { type: armorItem_1.ArmorItemSchema, required: true },
    torso: { type: armorItem_1.ArmorItemSchema, required: true },
    arms: { type: armorItem_1.ArmorItemSchema, required: true },
    legs: { type: armorItem_1.ArmorItemSchema, required: true },
}, { _id: false });
exports.ArmorSchema = ArmorSchema;
var PlayerStatSchema = new mongoose_2.Schema({
    name: { type: String, enum: Object.values(enums_1.StatName), required: true },
    starting: { type: Number, required: true, default: 0 },
    advance: { type: Number, required: true, default: 0 },
    current: { type: Number, required: true, default: 0 },
}, { _id: false });
var SingleStatSchema = new mongoose_2.Schema({
    name: { type: String, enum: Object.values(enums_1.StatName), required: true },
    current: { type: Number, required: true, default: 0 },
}, { _id: false });
var PlayerStatsSchema = new mongoose_2.Schema({
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
}, { _id: false });
var SkillLvlSchema = new mongoose_2.Schema({
    skill: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
    },
    lvl: {
        type: String,
        enum: Object.values(enums_1.SkillLvl),
        required: true,
    },
}, { _id: false });
exports.SkillLvlSchema = SkillLvlSchema;
var TalentSchema = new mongoose_2.Schema({
    talent: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Talent',
        required: true,
    }
}, { _id: false });
exports.TalentSchema = TalentSchema;
var SpellSchema = new mongoose_2.Schema({
    spell: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Spell',
        required: true,
    }
}, { _id: false });
var PlayerCharacterSchema = new mongoose_2.Schema({
    owner_id: { type: mongoose_2.Schema.Types.ObjectId, required: true, index: true },
    session_id: { type: mongoose_2.Schema.Types.ObjectId, required: true, index: true },
    name: { type: String, required: true, minLength: [3, "Name must have at least 3 characters"] },
    race: {
        type: String,
        enum: Object.values(enums_1.Race),
        required: true,
    },
    currentCareer: { type: String, requiredd: true },
    PreviousCareers: { type: [String], required: true },
    age: Number,
    gender: {
        type: String,
        enum: Object.values(enums_1.Gender),
        required: true
    },
    eyeColor: { type: String, default: "", required: true },
    hairColor: { type: String, default: "", required: true },
    starSign: { type: String, default: "", required: true },
    weight: { type: Number, default: 0, required: true },
    height: { type: Number, default: 0, required: true },
    numOfSiblings: { type: Number, default: 0, required: true },
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
    items: { type: [item_1.ItemSchema], required: true, default: [] },
    weapons: { type: [weaponItem_1.WeaponItemSchema], default: [], required: true },
    armor: { type: ArmorSchema, required: true }
});
var PlayerCharacterSheet = mongoose_1.default.model("PlayerCharacterSheet", PlayerCharacterSchema);
exports.PlayerCharacterSheet = PlayerCharacterSheet;
