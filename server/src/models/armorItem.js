"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArmorItemSchema = exports.ArmorItem = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var item_1 = require("./item");
var ArmorItemSchema = new mongoose_2.Schema({
    item: { type: item_1.ItemSchema, required: true },
    coverLocation: [String],
    armor: { type: Number, required: true, default: 0 },
});
exports.ArmorItemSchema = ArmorItemSchema;
var ArmorItem = mongoose_1.default.model("ArmorItem", ArmorItemSchema);
exports.ArmorItem = ArmorItem;
