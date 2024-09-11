"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponItemSchema = exports.WeaponItem = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var item_1 = require("./item");
var WeaponItemSchema = new mongoose_2.Schema({
    item: { type: item_1.ItemSchema, required: true },
    category: { type: String, required: true },
    range: { type: String, required: true },
    strength: { type: String, required: true },
    reload: { type: String, required: true },
    weaponFeatures: { type: String, required: true },
});
exports.WeaponItemSchema = WeaponItemSchema;
var WeaponItem = mongoose_1.default.model("WeaponItem", WeaponItemSchema);
exports.WeaponItem = WeaponItem;
