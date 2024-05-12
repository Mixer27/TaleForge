"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerCharacterSheet = exports.TalentSchema = exports.SkillLvlSchema = exports.ArmorSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var Race;
(function (Race) {
    Race["HALFLING"] = "Halfing";
    Race["HUMAN"] = "Human";
    Race["ELF"] = "Elf";
    Race["DWARF"] = "Dwarf";
})(Race || (Race = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
})(Gender || (Gender = {}));
var SkillLvl;
(function (SkillLvl) {
    SkillLvl["NORMAL"] = "Normal";
    SkillLvl["ADVANCED"] = "Advanced";
    SkillLvl["EXPERT"] = "Expert";
})(SkillLvl || (SkillLvl = {}));
var ArmorSchema = new mongoose_2.Schema({
    head: Number,
    arms: Number,
    body: Number,
    legs: Number,
}, { _id: false });
exports.ArmorSchema = ArmorSchema;
var PlayerStatSchema = new mongoose_2.Schema({
    starting: Number,
    advance: Number,
    current: Number,
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
    insanityPoints: Number,
    fatePoints: Number,
}, { _id: false });
var SkillLvlSchema = new mongoose_2.Schema({
    skill: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Skill',
    },
    lvl: {
        type: String,
        enum: Object.values(SkillLvl),
    },
}, { _id: false });
exports.SkillLvlSchema = SkillLvlSchema;
var TalentSchema = new mongoose_2.Schema({
    talent: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Talent',
    }
}, { _id: false });
exports.TalentSchema = TalentSchema;
var PlayerCharacterSchema = new mongoose_2.Schema({
    owner_id: mongoose_2.Schema.Types.ObjectId,
    session_id: mongoose_2.Schema.Types.ObjectId,
    name: String,
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
    eyeColor: String,
    hairColor: String,
    starSign: String,
    weight: Number,
    height: Number,
    numOfSiblings: Number,
    birthplace: String,
    distinguishMarks: String,
    backstory: String,
    armor: ArmorSchema,
    stats: PlayerStatsSchema,
    skills: [SkillLvlSchema],
    talents: [TalentSchema],
    wealth: {
        gc: Number,
        sh: Number,
        pn: Number,
    }
});
var PlayerCharacterSheet = mongoose_1.default.model("PlayerCharacterSheet", PlayerCharacterSchema);
exports.PlayerCharacterSheet = PlayerCharacterSheet;
