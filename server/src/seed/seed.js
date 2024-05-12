"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var playerCharacterSheet_1 = require("../models/playerCharacterSheet");
var example = {
    'owner_id': new mongoose_1.default.Types.ObjectId(),
    'session_id': new mongoose_1.default.Types.ObjectId(),
    'name': 'John Doe',
    'race': 'Elf',
    'currentCareer': 'Adventurer',
    'PreviousCareers': ['Novice', 'Apprentice'],
    'age': 48,
    'gender': 'Male',
    'eyeColor': 'Blue',
    'hairColor': 'Dark',
    'starSign': 'The Big Cross',
    'weight': 76,
    'height': 165,
    'numOfSiblings': 4,
    'birthplace': 'Small Village',
    'distinguishMarks': 'Scar on the left cheek',
    'backstory': 'Lost in the woods and raised by wolves.',
    'armor': {
        'head': 0,
        'arms': 0,
        'body': 0,
        'legs': 0,
    },
    'stats': {
        'weaponSkills': { 'starting': 30, 'advance': 5, 'current': 35 },
        'ballisticSkills': { 'starting': 25, 'advance': 5, 'current': 30 },
        'strength': { 'starting': 35, 'advance': 5, 'current': 40 },
        'toughness': { 'starting': 40, 'advance': 5, 'current': 45 },
        'agility': { 'starting': 30, 'advance': 10, 'current': 40 },
        'intelligence': { 'starting': 25, 'advance': 15, 'current': 40 },
        'willPower': { 'starting': 30, 'advance': 10, 'current': 40 },
        'fellowship': { 'starting': 20, 'advance': 10, 'current': 30 },
        'attacks': { 'starting': 1, 'advance': 0, 'current': 1 },
        'wounds': { 'starting': 12, 'advance': 3, 'current': 15 },
        'magic': { 'starting': 0, 'advance': 1, 'current': 1 },
        'movement': { 'starting': 4, 'advance': 0, 'current': 4 },
        'insanityPoints': 4,
        'fatePoints': 2
    },
    'skills': [],
    'talents': [],
    'wealth': {
        'gc': 5,
        'sh': 2,
        'pn': 10,
    }
};
// Database connection
var dbUrl = "mongodb://localhost:27017/taleForge";
mongoose_1.default.connect(dbUrl, {});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to database");
});
var seedDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, playerCharacterSheet_1.PlayerCharacterSheet.deleteMany({})];
            case 1:
                _a.sent();
                character = new playerCharacterSheet_1.PlayerCharacterSheet(__assign({}, example));
                return [4 /*yield*/, character.save()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
seedDB().then(function () {
    mongoose_1.default.connection.close();
    console.log("Seeding Done.");
});
