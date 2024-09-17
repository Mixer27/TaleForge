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
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultArmor = exports.defaultMoney = exports.defaultPlayerCharacterSheet = void 0;
var enums_1 = require("./enums");
// import { PlayerCharacterSheet, PlayerStats } from "../models/playerCharacterSheet";
var mongoose_1 = require("mongoose");
var defaultPlayerStats = {
    weaponSkills: { name: 'Walka wręcz', starting: 0, advance: 0, current: 0 },
    ballisticSkills: {
        name: 'Umiejętności strzeleckie',
        starting: 0,
        advance: 0,
        current: 0
    },
    strength: { name: 'Krzepa', starting: 0, advance: 0, current: 0 },
    toughness: { name: 'Odporność', starting: 0, advance: 0, current: 0 },
    agility: { name: 'Zręczność', starting: 0, advance: 0, current: 0 },
    intelligence: { name: 'Inteligencja', starting: 0, advance: 0, current: 0 },
    willPower: { name: 'Siła woli', starting: 0, advance: 0, current: 0 },
    fellowship: { name: 'Ogłada', starting: 0, advance: 0, current: 0 },
    attacks: { name: 'Ataki', starting: 0, advance: 0, current: 0 },
    wounds: { name: 'Żywotność', starting: 0, advance: 0, current: 0 },
    magic: { name: 'Magia', starting: 0, advance: 0, current: 0 },
    movement: { name: 'Szybkość', starting: 0, advance: 0, current: 0 },
    strengthBonus: {
        name: 'Siła',
        current: 0,
    },
    toughnessBonus: {
        name: 'Wytrzymałość',
        current: 0,
    },
    insanityPoints: {
        name: 'Punkty obłędu',
        current: 0,
    },
    fatePoints: {
        name: 'Punkty przeznaczenia',
        current: 0,
    }
};
var defaultMoney = {
    gc: 0,
    sh: 0,
    pn: 0,
};
exports.defaultMoney = defaultMoney;
var defaultArmor = {
    head: {
        item: {
            name: "-",
            description: "-",
            weight: 0,
            value: __assign({}, defaultMoney),
            availability: "-",
        },
        coverLocation: [],
        armor: 0,
    },
    torso: {
        item: {
            name: "-",
            description: "-",
            weight: 0,
            value: __assign({}, defaultMoney),
            availability: "-",
        },
        coverLocation: [],
        armor: 0,
    },
    arms: {
        item: {
            name: "-",
            description: "-",
            weight: 0,
            value: __assign({}, defaultMoney),
            availability: "-",
        },
        coverLocation: [],
        armor: 0,
    },
    legs: {
        item: {
            name: "-",
            description: "-",
            weight: 0,
            value: __assign({}, defaultMoney),
            availability: "-",
        },
        coverLocation: [],
        armor: 0,
    },
};
exports.defaultArmor = defaultArmor;
var defaultPlayerCharacterSheet = {
    // _id: "",
    owner_id: new mongoose_1.default.Types.ObjectId(),
    name: "",
    race: enums_1.Race.HUMAN,
    currentCareer: "",
    PreviousCareers: [],
    age: 0,
    gender: enums_1.Gender.OTHER,
    eyeColor: "",
    hairColor: "",
    starSign: "",
    weight: 0,
    height: 0,
    numOfSiblings: 0,
    birthplace: "",
    distinguishMarks: "",
    backstory: "",
    religion: "",
    mentalDisorders: "",
    scarsAndWounds: "",
    stats: __assign({}, defaultPlayerStats),
    armor: __assign({}, defaultArmor),
    items: [],
    weapons: [],
    skills: [],
    talents: [],
    spells: [],
    wealth: __assign({}, defaultMoney),
};
exports.defaultPlayerCharacterSheet = defaultPlayerCharacterSheet;
