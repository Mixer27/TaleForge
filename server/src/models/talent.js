"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Talent = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var TalentSchema = new mongoose_2.Schema({
    name: String,
    description: String,
});
var Talent = mongoose_1.default.model("Talent", TalentSchema);
exports.Talent = Talent;
