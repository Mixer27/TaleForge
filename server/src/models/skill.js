"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var SkillSchema = new mongoose_2.Schema({
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
});
var Skill = mongoose_1.default.model("Skill", SkillSchema);
exports.Skill = Skill;
