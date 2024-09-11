"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = exports.Item = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
// import { MoneySchema } from "./playerCharacterSheet";
var MoneySchema = new mongoose_2.Schema({
    gc: { type: Number, default: 0 },
    sh: { type: Number, default: 0 },
    pn: { type: Number, default: 0 },
}, { _id: false });
var ItemSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    value: { type: MoneySchema, required: true },
    availability: { type: String, required: true },
});
exports.ItemSchema = ItemSchema;
var Item = mongoose_1.default.model("Item", ItemSchema);
exports.Item = Item;
