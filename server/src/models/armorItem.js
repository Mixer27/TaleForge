"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArmorItem = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var item_1 = require("./item");
var ArmorItemSchema = new mongoose_2.Schema({
    item: item_1.ItemSchema,
    coverLocation: [String],
    armor: Number,
});
var ArmorItem = mongoose_1.default.model("ArmorItem", ArmorItemSchema);
exports.ArmorItem = ArmorItem;
