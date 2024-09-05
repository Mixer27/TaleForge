"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcSheet = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var playerCharacterSheet_1 = require("./playerCharacterSheet");
var NpcStatsSchema = new mongoose_2.Schema({
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
});
var NpcSheetSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    currentCareer: { type: String, required: true },
    previousCareers: { type: [String], default: [] },
    race: { type: String, required: true },
    stats: { type: NpcStatsSchema, required: true },
    skills: { type: [playerCharacterSheet_1.SkillLvlSchema], default: [] },
    talents: { type: [playerCharacterSheet_1.TalentSchema], default: [] },
    armor: { type: playerCharacterSheet_1.ArmorSchema, required: true },
    weapons: { type: [String], default: [] },
    equipment: { type: [String], default: [] },
    wealth: {
        gc: Number,
        sh: Number,
        pn: Number,
    }
});
var NpcSheet = mongoose_1.default.model("NpcSheet", NpcSheetSchema);
exports.NpcSheet = NpcSheet;
