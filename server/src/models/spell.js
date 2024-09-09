"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spell = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var SpellSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    castingNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    castingTime: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});
var Spell = mongoose_1.default.model("Spell", SpellSchema);
exports.Spell = Spell;
