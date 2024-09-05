"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillLvl = exports.Skill = exports.PlayerCharacterSheet = exports.TalentSchema = exports.SkillLvlSchema = exports.ArmorSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var skill_1 = require("./skill");
Object.defineProperty(exports, "Skill", { enumerable: true, get: function () { return skill_1.Skill; } });
var Race = Object.freeze({
    HALFLING: "Halfling",
    HUMAN: "Human",
    ELF: "Elf",
    DWARF: "Dwarf",
});
var Gender = Object.freeze({
    MALE: "Male",
    FEMALE: "Female",
});
var SkillLvl = Object.freeze({
    NORMAL: "Taken",
    ADVANCED: "+10%",
    EXPERT: "+20%",
});
exports.SkillLvl = SkillLvl;
var ArmorSchema = new mongoose_2.Schema({
    head: { type: Number, required: true, default: 0 },
    l_arm: { type: Number, required: true, default: 0 },
    r_arm: { type: Number, required: true, default: 0 },
    body: { type: Number, required: true, default: 0 },
    l_leg: { type: Number, required: true, default: 0 },
    r_leg: { type: Number, required: true, default: 0 },
}, { _id: false });
exports.ArmorSchema = ArmorSchema;
var PlayerStatSchema = new mongoose_2.Schema({
    starting: { type: Number, required: true, default: 0 },
    advance: { type: Number, required: true, default: 0 },
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
    strengthBonus: { type: Number, required: true, default: 0 },
    toughnessBonus: { type: Number, required: true, default: 0 },
    insanityPoints: { type: Number, required: true, default: 0 },
    fatePoints: { type: Number, required: true, default: 0 },
}, { _id: false });
var SkillLvlSchema = new mongoose_2.Schema({
    skill: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
    },
    lvl: {
        type: String,
        enum: Object.values(SkillLvl),
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
var PlayerCharacterSchema = new mongoose_2.Schema({
    owner_id: { type: mongoose_2.Schema.Types.ObjectId, required: true, index: true },
    session_id: { type: mongoose_2.Schema.Types.ObjectId, required: true, index: true },
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
    wealth: {
        gc: { type: Number, default: 0 },
        sh: { type: Number, default: 0 },
        pn: { type: Number, default: 0 },
    }
});
var PlayerCharacterSheet = mongoose_1.default.model("PlayerCharacterSheet", PlayerCharacterSchema);
exports.PlayerCharacterSheet = PlayerCharacterSheet;
