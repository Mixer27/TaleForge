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
var skill_1 = require("../models/skill");
var talent_1 = require("../models/talent");
// import { NpcSheet } from "../models/npcSheet";
var spell_1 = require("../models/spell");
var enums_1 = require("../types/enums");
var item_1 = require("../models/item");
var armorItem_1 = require("../models/armorItem");
var weaponItem_1 = require("../models/weaponItem");
var user_1 = require("../models/user");
var bcrypt_1 = require("bcrypt");
var defaults_1 = require("../utils/defaults");
var items = [
    {
        "name": "Lampa",
        "description": "Oświeta mrok.",
        "weight": 15,
        "value": {
            "gc": 0,
            "sh": 4,
            "pn": 0
        },
        "availability": "mała"
    },
    {
        "name": "Sakwa podróżna",
        "description": "Skórzana sakwa na ramię, która pomieści podstawowe rzeczy podróżnika.",
        "weight": 5,
        "value": {
            "gc": 0,
            "sh": 2,
            "pn": 6
        },
        "availability": "pospolita"
    },
    {
        "name": "Menażka",
        "description": "Metalowy zestaw do gotowania, idealny dla podróżników i najemników.",
        "weight": 2,
        "value": {
            "gc": 0,
            "sh": 1,
            "pn": 8
        },
        "availability": "pospolita"
    },
    {
        "name": "Zestaw do pisania",
        "description": "Składa się z pergaminu, atramentu i pióra. Używany do sporządzania dokumentów.",
        "weight": 1,
        "value": {
            "gc": 0,
            "sh": 3,
            "pn": 5
        },
        "availability": "średnia"
    },
    {
        "name": "Lina",
        "description": "Długa, solidna lina, która może być użyta do wspinaczki lub zabezpieczania ładunku.",
        "weight": 10,
        "value": {
            "gc": 0,
            "sh": 1,
            "pn": 0
        },
        "availability": "pospolita"
    },
    {
        "name": "Fajka i tytoń",
        "description": "Drewniana fajka z mieszanką aromatycznego tytoniu. Popularna wśród starszych podróżników.",
        "weight": 0.5,
        "value": {
            "gc": 0,
            "sh": 1,
            "pn": 0
        },
        "availability": "pospolita"
    }
];
var weaponItems = [
    {
        "item": {
            "name": "Broń dwuręczna",
            "description": "Ciężka broń dwuręczna z potężnymi uderzeniami.",
            "weight": 200,
            "value": {
                "gc": 20,
                "sh": 0,
                "pn": 0
            },
            "availability": "mała"
        },
        "category": "Dwuręczna",
        "range": "N/A", // Brak zasięgu dla broni białej
        "strength": "S+1",
        "reload": "N/A", // Brak konieczności przeładowania
        "weaponFeatures": "drzuczący, powolny"
    },
    {
        "item": {
            "name": "Broń jednoręczna",
            "description": "Standardowa broń jednoręczna.",
            "weight": 50,
            "value": {
                "gc": 10,
                "sh": 0,
                "pn": 0
            },
            "availability": "przeciętna"
        },
        "category": "Zwykla",
        "range": "N/A",
        "strength": "S",
        "reload": "N/A",
        "weaponFeatures": "specjalny"
    },
    {
        "item": {
            "name": "Kij",
            "description": "Prosty drewniany kij.",
            "weight": 75,
            "value": {
                "gc": 1,
                "sh": 0,
                "pn": 0
            },
            "availability": "duża"
        },
        "category": "Zwykla",
        "range": "N/A",
        "strength": "S-2",
        "reload": "N/A",
        "weaponFeatures": "ogłuszający, parujący"
    },
    {
        "item": {
            "name": "Halabarda",
            "description": "Wszechstronna broń drzewcowa.",
            "weight": 175,
            "value": {
                "gc": 15,
                "sh": 0,
                "pn": 0
            },
            "availability": "mała"
        },
        "category": "Dwuręczna",
        "range": "N/A",
        "strength": "S+1",
        "reload": "N/A",
        "weaponFeatures": "specjalny"
    },
    {
        "item": {
            "name": "Kopia",
            "description": "Lanca kawaleryjska.",
            "weight": 150,
            "value": {
                "gc": 15,
                "sh": 0,
                "pn": 0
            },
            "availability": "rzadka"
        },
        "category": "Kawaleryjska",
        "range": "N/A",
        "strength": "S+1",
        "reload": "N/A",
        "weaponFeatures": "ciężki, drzuczący, szybki"
    }
];
var armorItems = [
    {
        item: {
            name: "Helm (skórzany)",
            description: "Skórzany hełm chroniący głowę.",
            weight: 10,
            value: { gc: 0, sh: 3, pn: 0 }, // 3 złote korony
            availability: "przeciętna"
        },
        coverLocation: ["głowa"],
        armor: 1,
    },
    {
        item: {
            name: "Kaftan (skórzany)",
            description: "Skórzany kaftan chroniący korpus.",
            weight: 40,
            value: { gc: 0, sh: 6, pn: 0 }, // 6 złotych koron
            availability: "przeciętna"
        },
        coverLocation: ["korpus"],
        armor: 1,
    },
    {
        item: {
            name: "Kurta (skórzana)",
            description: "Skórzana kurta chroniąca korpus i ręce.",
            weight: 50,
            value: { gc: 0, sh: 12, pn: 0 }, // 12 złotych koron
            availability: "przeciętna"
        },
        coverLocation: ["Korpus", "ręce"],
        armor: 1,
    },
    {
        item: {
            name: "Nogawice (skórzane)",
            description: "Skórzane nogawice chroniące nogi.",
            weight: 50,
            value: { gc: 0, sh: 12, pn: 0 }, // 12 złotych koron
            availability: "przeciętna"
        },
        coverLocation: ["nogi"],
        armor: 1,
    },
    {
        item: {
            name: "Skórznia",
            description: "Pełna skórznia chroniąca wszystkie części ciała.",
            weight: 80,
            value: { gc: 0, sh: 25, pn: 0 }, // 25 złotych koron
            availability: "mała"
        },
        coverLocation: ["głowa", "korpus", "ręce", "nogi"],
        armor: 1,
    },
    {
        item: {
            name: "Czepiec (kolczuga)",
            description: "Kolczugowy czepiec chroniący głowę.",
            weight: 30,
            value: { gc: 0, sh: 20, pn: 0 }, // 20 złotych koron
            availability: "mała"
        },
        coverLocation: ["głowa"],
        armor: 2,
    },
    {
        item: {
            name: "Kaftan (kolczuga)",
            description: "Kolczugowy kaftan chroniący korpus.",
            weight: 60,
            value: { gc: 0, sh: 95, pn: 0 }, // 95 złotych koron
            availability: "mała"
        },
        coverLocation: ["korpus"],
        armor: 2,
    },
    {
        item: {
            name: "Koszulka (kolczuga)",
            description: "Kolczugowa koszulka chroniąca korpus i ręce.",
            weight: 80,
            value: { gc: 0, sh: 75, pn: 0 }, // 75 złotych koron
            availability: "mała"
        },
        coverLocation: ["korpus", "ręce"],
        armor: 2,
    },
    {
        item: {
            name: "Kolczuga z rękawami",
            description: "Pełna kolczuga z rękawami chroniąca korpus i nogi.",
            weight: 120,
            value: { gc: 0, sh: 125, pn: 0 }, // 125 złotych koron
            availability: "mała"
        },
        coverLocation: ["korpus", "nogi"],
        armor: 2,
    },
    {
        item: {
            name: "Nogawice (kolczuga)",
            description: "Kolczugowe nogawice chroniące nogi.",
            weight: 60,
            value: { gc: 0, sh: 20, pn: 0 }, // 20 złotych koron
            availability: "mała"
        },
        coverLocation: ["nogi"],
        armor: 2,
    },
    {
        item: {
            name: "Zbroja kolcza",
            description: "Pełna zbroja kolcza chroniąca całe ciało.",
            weight: 210,
            value: { gc: 0, sh: 170, pn: 0 }, // 170 złotych koron
            availability: "sporadyczna"
        },
        coverLocation: ["głowa", "korpus", "ręce", "nogi"],
        armor: 2,
    },
    {
        item: {
            name: "Helm (płytowy)",
            description: "Płytowy hełm chroniący głowę.",
            weight: 40,
            value: { gc: 0, sh: 30, pn: 0 }, // 30 złotych koron
            availability: "sporadyczna"
        },
        coverLocation: ["głowa"],
        armor: 2,
    },
    {
        item: {
            name: "Naramienniki (płytowe)",
            description: "Płytowe naramienniki chroniące ręce.",
            weight: 30,
            value: { gc: 0, sh: 60, pn: 0 }, // 60 złotych koron
            availability: "sporadyczna"
        },
        coverLocation: ["ręce"],
        armor: 2,
    },
    {
        item: {
            name: "Nogawice (płytowe)",
            description: "Płytowe nogawice chroniące nogi.",
            weight: 75,
            value: { gc: 0, sh: 90, pn: 0 }, // 90 złotych koron
            availability: "sporadyczna"
        },
        coverLocation: ["nogi"],
        armor: 2,
    },
    {
        item: {
            name: "Napierśnik (płytowy)",
            description: "Płytowy napierśnik chroniący korpus.",
            weight: 140,
            value: { gc: 0, sh: 120, pn: 0 }, // 120 złotych koron
            availability: "sporadyczna"
        },
        coverLocation: ["korpus"],
        armor: 2,
    },
    {
        item: {
            name: "Zbroja płytowa",
            description: "Pełna płytowa zbroja chroniąca całe ciało.",
            weight: 395,
            value: { gc: 0, sh: 400, pn: 0 }, // 400 złotych koron
            availability: "rzadka"
        },
        coverLocation: ["głowa", "korpus", "ręce", "nogi"],
        armor: 5,
    }
];
var examples = [{
        'owner_id': new mongoose_1.default.Types.ObjectId("66e9ba372fd89788d886d392"),
        'session_id': new mongoose_1.default.Types.ObjectId(),
        'name': 'Johan Schmidt',
        'race': enums_1.Race.ELF,
        'currentCareer': 'Poszukiwacz przygód',
        'PreviousCareers': ['Nowicjusz', 'Uczeń'],
        'age': 48,
        'gender': enums_1.Gender.MALE,
        'eyeColor': 'Niebieskie',
        'hairColor': 'Ciemne',
        'starSign': 'Wielki Krzyż',
        'weight': 76,
        'height': 165,
        'numOfSiblings': 4,
        'birthplace': 'Mała wioska',
        'distinguishMarks': 'Blizna na lewym policzku',
        'backstory': 'Zgubiony w lesie i wychowany przez wilki.',
        religion: "-",
        mentalDisorders: 'Arachnofobia',
        scarsAndWounds: '-',
        stats: {
            weaponSkills: { name: enums_1.StatName.WEAPON_SKILLS, starting: 30, advance: 5, current: 35 },
            ballisticSkills: { name: enums_1.StatName.BALLISTIC_SKILLS, starting: 25, advance: 5, current: 30 },
            strength: { name: enums_1.StatName.STRENGTH, starting: 35, advance: 5, current: 40 },
            toughness: { name: enums_1.StatName.TOUGHNESS, starting: 40, advance: 5, current: 45 },
            agility: { name: enums_1.StatName.AGILITY, starting: 30, advance: 10, current: 40 },
            intelligence: { name: enums_1.StatName.INTELLIGENCE, starting: 25, advance: 15, current: 40 },
            willPower: { name: enums_1.StatName.WILL_POWER, starting: 30, advance: 10, current: 40 },
            fellowship: { name: enums_1.StatName.FELLOWSHIP, starting: 20, advance: 10, current: 30 },
            attacks: { name: enums_1.StatName.ATTACKS, starting: 1, advance: 0, current: 1 },
            wounds: { name: enums_1.StatName.WOUNDS, starting: 12, advance: 3, current: 15 },
            movement: { name: enums_1.StatName.MOVEMENT, starting: 4, advance: 0, current: 4 },
            magic: { name: enums_1.StatName.MAGIC, starting: 0, advance: 1, current: 1 },
            strengthBonus: { name: enums_1.StatName.STRENGTH_BONUS, current: 4 },
            toughnessBonus: { name: enums_1.StatName.TOUGHNESS_BONUS, current: 4 },
            insanityPoints: { name: enums_1.StatName.INSANITY_POINTS, current: 4 },
            fatePoints: { name: enums_1.StatName.FATE_POINTS, current: 2 },
        },
        'skills': [],
        'talents': [],
        spells: [],
        'wealth': {
            'gc': 5,
            'sh': 2,
            'pn': 10,
        },
        items: [],
        weapons: [],
        armor: defaults_1.defaultArmor,
    },
    {
        owner_id: new mongoose_1.default.Types.ObjectId("66e9ba372fd89788d886d392"),
        session_id: new mongoose_1.default.Types.ObjectId(),
        name: "Reinhardt Falken",
        race: enums_1.Race.HUMAN,
        currentCareer: "Wojownik",
        PreviousCareers: ["Rolnik"],
        age: 30,
        gender: enums_1.Gender.MALE,
        eyeColor: "Niebieskie",
        hairColor: "Czarne",
        starSign: "Wół Gnuthus",
        weight: 82,
        height: 183,
        numOfSiblings: 2,
        birthplace: "Nieznane",
        distinguishMarks: "Blizna na lewym policzku",
        backstory: "Doświadczony wojownik o tajemniczej przeszłości.",
        religion: "Sigmar",
        mentalDisorders: 'Trypofobia',
        scarsAndWounds: 'Stara zagojona rana postrzałowa',
        stats: {
            weaponSkills: { name: enums_1.StatName.WEAPON_SKILLS, starting: 30, advance: 5, current: 35 },
            ballisticSkills: { name: enums_1.StatName.BALLISTIC_SKILLS, starting: 25, advance: 5, current: 30 },
            strength: { name: enums_1.StatName.STRENGTH, starting: 40, advance: 10, current: 50 },
            toughness: { name: enums_1.StatName.TOUGHNESS, starting: 30, advance: 5, current: 35 },
            agility: { name: enums_1.StatName.AGILITY, starting: 20, advance: 0, current: 20 },
            intelligence: { name: enums_1.StatName.INTELLIGENCE, starting: 25, advance: 5, current: 30 },
            willPower: { name: enums_1.StatName.WILL_POWER, starting: 30, advance: 10, current: 40 },
            fellowship: { name: enums_1.StatName.FELLOWSHIP, starting: 20, advance: 5, current: 25 },
            attacks: { name: enums_1.StatName.ATTACKS, starting: 1, advance: 1, current: 2 },
            wounds: { name: enums_1.StatName.WOUNDS, starting: 10, advance: 5, current: 15 },
            magic: { name: enums_1.StatName.MAGIC, starting: 0, advance: 0, current: 0 },
            movement: { name: enums_1.StatName.MOVEMENT, starting: 4, advance: 0, current: 4 },
            strengthBonus: { name: enums_1.StatName.STRENGTH_BONUS, current: 5 },
            toughnessBonus: { name: enums_1.StatName.TOUGHNESS_BONUS, current: 3 },
            insanityPoints: { name: enums_1.StatName.INSANITY_POINTS, current: 0 },
            fatePoints: { name: enums_1.StatName.FATE_POINTS, current: 2 },
        },
        skills: [
            {
                skill: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f5'), // Example ObjectId for Umiejętność Opieka nad zwierzętami
                lvl: enums_1.SkillLvl.NORMAL,
            },
            {
                skill: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f6'), // Example ObjectId for Unik
                lvl: enums_1.SkillLvl.ADVANCED,
            },
            {
                skill: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f7'), // Example ObjectId for Leczenie
                lvl: enums_1.SkillLvl.NORMAL,
            },
            {
                skill: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f8'), // Example ObjectId for Percepcja
                lvl: enums_1.SkillLvl.EXPERT,
            },
            {
                skill: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f9'), // Example ObjectId for Zastraszanie
                lvl: enums_1.SkillLvl.ADVANCED,
            },
        ],
        talents: [],
        spells: [],
        wealth: {
            gc: 10,
            sh: 20,
            pn: 30,
        },
        items: [items[0]],
        weapons: [weaponItems[0]],
        armor: defaults_1.defaultArmor,
    }
];
// Skills
var skills = [
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f5'),
        name: "Opieka nad zwierzętami",
        relatedStatName: "intelligence", // In WFRP, Animal Care is based on Intelligence
        advanced: false,
        description: "Pozwala opiekować się i leczyć pospolite zwierzęta domowe."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f6'),
        name: "Oswajanie zwierząt",
        relatedStatName: "fellowship", // Charm Animal is typically based on Fellowship
        advanced: false,
        description: "Pomaga uspokoić lub oczarować zwierzęta poprzez łagodną interakcję."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f7'),
        name: "Unik",
        relatedStatName: "agility", // Dodge Blow is based on Agility
        advanced: false,
        description: "Pozwala unikać nadchodzących ciosów w walce."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f8'),
        name: "Leczenie",
        relatedStatName: "intelligence", // Heal is based on Intelligence
        advanced: false,
        description: "Pozwala leczyć rany, zapobiegać krwawieniu oraz wspomagać regenerację po obrażeniach."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67f9'),
        name: "Spostrzegawczość",
        relatedStatName: "intelligence", // Perception is based on Intelligence
        advanced: false,
        description: "Pozwala dostrzegać ukryte przedmioty lub wykrywać zagrożenia wokół ciebie."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67fa'),
        name: "Jazda konna",
        relatedStatName: "agility", // Ride is based on Agility
        advanced: false,
        description: "Pomaga jeździć i kontrolować wierzchowca, takiego jak koń lub podobne stworzenia."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67fb'),
        name: "Zastraszanie",
        relatedStatName: "strength", // Intimidate is based on Strength
        advanced: false,
        description: "Pozwala zmusić innych do uległości poprzez samą obecność fizyczną lub werbalne groźby."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67fc'),
        name: "Pływanie",
        relatedStatName: "strength", // Swim is based on Strength
        advanced: false,
        description: "Pozwala pływać w wodzie, unikając utonięcia lub porwania przez prądy."
    },
    // ADVANCED
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67fd'),
        name: "Alchemia",
        relatedStatName: "intelligence", // Alchemy is based on Intelligence
        advanced: true,
        description: "Pozwala tworzyć mikstury, trucizny i inne substancje alchemiczne."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67fe'),
        name: "Język magiczny",
        relatedStatName: "intelligence", // Arcane Language is based on Intelligence
        advanced: true,
        description: "Pozwala czytać i rozumieć magiczne księgi oraz komunikować się w mistycznych językach."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d67ff'),
        name: "Charakteryzacja",
        relatedStatName: "fellowship", // Disguise is based on Fellowship
        advanced: true,
        description: "Pozwala przebrać się lub innych, aby wtapiać się w różne grupy społeczne lub kulturowe."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d6800'),
        name: "Nawigacja",
        relatedStatName: "intelligence", // Navigation is based on Intelligence
        advanced: true,
        description: "Pozwala odnaleźć drogę przez dzicz, morza lub nieznane miasta, korzystając z map i punktów orientacyjnych."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId('66d82a3046f4cd59924d6801'),
        name: "Taktyka",
        relatedStatName: "intelligence", // Tactics is based on Intelligence
        advanced: true,
        description: "Daje umiejętność planowania i realizacji złożonych strategii bitewnych podczas wojen lub mniejszych potyczek."
    }
];
var talents = [
    {
        name: "Broń naturalna",
        description: "Bohater jest uzbrojony w naturalną broń, jak pazury, kły czy kolce. Zadaje obrażenia w zależności od rodzaju posiadanej broni naturalnej.",
    },
    {
        name: "Broń specjalna (różne)",
        description: "Bohater potrafi używać konkretnego typu broni specjalnej, takiej jak np. łuki, kusze czy broń palna. Talent ten może być wykorzystywany wielokrotnie dla różnych rodzajów broni.",
    },
    {
        name: "Bystry wzrok",
        description: "Bohater ma wyjątkowo dobry wzrok, co pozwala mu dostrzegać detale i obiekty z większej odległości niż przeciętny człowiek. Otrzymuje +10 do testów Zręczności związanych ze wzrokiem.",
    },
    {
        name: "Charyzmatyczny",
        description: "Bohater posiada naturalny urok osobisty, który pozwala mu łatwiej zdobywać zaufanie i wpływać na innych. Otrzymuje +10 do testów Zręczności związanych z przekonywaniem.",
    },
    {
        name: "Chirurgia",
        description: "Bohater potrafi wykonywać zabiegi chirurgiczne, które mogą uratować życie innym. Otrzymuje +10 do testów związanych z leczeniem poważnych ran.",
    },
    {
        name: "Czarnoksięstwo",
        description: "Bohater posiadł wiedzę i zdolności do manipulacji mrocznymi energiami magii czarnoksięskiej, uzyskując dostęp do zaklęć czarnoksięstwa.",
    },
    {
        name: "Chłód",
        description: "Bohater jest odporny na ekstremalne zimno. Może przetrwać w mroźnych warunkach bez specjalnej ochrony przez długi czas.",
    },
    {
        name: "Błyskawiczne przeładowanie",
        description: "Bohater potrafi przeładować broń dystansową z nadzwyczajną szybkością, pozwalając na wykonanie dodatkowych ataków.",
    },
    {
        name: "Bardzo silny",
        description: "Bohater posiada nadludzką siłę fizyczną, co daje mu znaczną przewagę w walce wręcz. Otrzymuje +10 do testów związanych z siłą.",
    },
    {
        name: "Bardzo szybki",
        description: "Bohater porusza się znacznie szybciej niż przeciętny człowiek, co pozwala mu szybciej reagować i unikać ataków.",
    },
    {
        "name": "Człowiek-guma",
        "description": "Bohater potrafi wyginać swoje ciało w sposób nieosiągalny dla zwykłych osób. Otrzymuje modyfikator +10 do testów kuglarstwa (akrobatyka) oraz modyfikator +20 do Zręczności podczas testów wyzwalania się z więzów, przeciskania przez szczeliny, itp."
    },
    {
        "name": "Czuły słuch",
        "description": "Bohater obdarzony jest wyjątkowo czułym słuchem. Otrzymuje modyfikator +20 do testów spostrzegawczości podczas nasłuchiwania."
    },
    {
        "name": "Dotyk mocy",
        "description": "Niektóre czary używane w walce wymagają dotknięcia przeciwnika. Bohater, który posiada zdolność dotyk mocy, otrzymuje modyfikator +20 do Walki Wręcz przy testach związanych z rzucaniem czarów dotykowych."
    },
    {
        "name": "Etykieta",
        "description": "Bohater potrafi odpowiednio zachowywać się we wszelkich sytuacjach towarzyskich. Otrzymuje modyfikator +10 do testów plotkowania i przekonywania podczas rozmów z przedstawicielami szlachty i arystokracji. Modyfikator stosuje się również w sytuacjach, gdy wymagana jest znajomość etykiety (na przykład podszywanie się pod szlachcica z wykorzystaniem charakteryzacji)."
    },
    {
        "name": "Geniusz arytmetyczny",
        "description": "Bohater potrafi błyskawicznie rachować w umyśle oraz, mając do dyspozycji dostatecznie dużo czasu, może rozwiązać niemal dowolny problem matematyczny. Otrzymuje modyfikator +10 do testów hazardu i nawigacji oraz modyfikator +20 do testów spostrzegawczości związanych z oceną odległości, ciężaru, itd."
    },
    {
        "name": "Grotołaz",
        "description": "Bohater wychował się w jaskiniach bądź często po nich wędrował. Bez trudu potrafi poruszać się w podziemiach. Otrzymuje modyfikator +10 do testów skradania się i ukrywania się wykonywanych pod powierzchnią ziemi lub w jaskiniach."
    },
    {
        "name": "Groźny",
        "description": "Wygląd, wzrost lub zachowanie Bohatera wzbudzają respekt i instynktowny niepokój wśród obserwatorów. Otrzymuje modyfikator +10 do testów zastraszania i torturowania."
    },
    {
        "name": "Gusła",
        "description": "Bohater odkrył w sobie dziki talent magiczny, który udoskonala metodą prób i błędów, nie mając dostępu do magicznych studiów."
    },
    {
        "name": "Krasnoludzki fach",
        "description": "Krasnoludy są urodzonymi rzemieślnikami. Bohater otrzymuje modyfikator +10 do testów rzemiosła: górnictwo, kamieniarstwo, kowalstwo, jubilerstwo, piwowarstwo, platnerstwo i rusznikarstwo."
    },
    {
        "name": "Krasomówstwo",
        "description": "Bohater potrafi przemawiać tak pięknie i przekonywująco, że może poderwać do działania całe tłumy. Wykorzystując przekonywanie BG może oddziaływać na grupę osób 100 razy liczniejszą niż normalnie. Zdolność krasomówstwo wymaga uprzedniego opanowania zdolności przemawianie."
    },
    {
        "name": "Krzepki",
        "description": "Bohater, który posiada tę zdolność, w czasie wielu przygód nabrał niesamowitej krzepy. Może nosić ciężki pancerz lub zbroję płytową bez zmniejszenia Szybkości. Szczegółowy opis pancerzy znajdziesz w Rozdziale V: Ekwipunek."
    },
    {
        "name": "Latanie",
        "description": "Postać potrafi latać. Zasady dotyczące latania znajdziesz w Rozdziale VI: Walka, obrażenia i ruch."
    },
    {
        "name": "Lewitacja",
        "description": "Postać potrafi unosić się nisko nad ziemią. Zasady dotyczące lewitacji znajdziesz w Rozdziale VI: Walka, obrażenia i ruch."
    },
    {
        "name": "Łotrzyk",
        "description": "Bohater jest blisko związany ze światem przestępczym. Otrzymuje modyfikator +10 do testów plotkowania i przekonywania w kontaktach z przedstawicielami przestępczego półświatka."
    },
    {
        "name": "Magia czarnoksięska",
        "description": "Twój Bohater poznał tajniki jednej z zakazanych tradycji magicznych. Podobnie jak w przypadku magii tajemnej, zgłębianie sekretów magii czarnoksięskiej wymagania poświęcenia i wyboru jednej z dostępnych mrocznych tradycji. Każda magia czarnoksięska jest oddzielną zdolnością. Na przykład magia czarnoksięska (Chaos) różni się od magii czarnoksięskiej (nekromancja)."
    },
    {
        "name": "Magia kapłańska",
        "description": "Bohater jest tak żarliwym wyznawcą jakiegoś bóstwa, że dzięki jego modlitwom zdarzają się rzeczy nadprzyrodzone. Bohater musi wybrać jednego boga, a w konsekwencji także jedną z magii kapłańskich. Każda magia kapłańska jest oddzielną zdolnością magiczną, pozwalającą na rzucanie czarów z dziedziny określonego bóstwa."
    },
    {
        "name": "Intrygant",
        "description": "Bohater jest mistrzem rozgrywek politycznych i intryg. Otrzymuje modyfikator +10 do testów przekonywania związanych z intrygami oraz do Siły Woli podczas testów przeciwko przekonywaniu ze strony innych osób."
    }
];
var spells = [
    {
        "name": "Wróżba",
        "domain": "Tradycja Niebios",
        "castingNumber": 4,
        "castingTime": "1 minuta",
        "ingredient": "wątroba małego zwierzęcia (+1)",
        "duration": "2k10 godzin",
        "description": "Czarodziej wróży z gwiazd, przepowiadając najbliższą przyszłość. Po rzuceniu czaru może spróbować określić, czy dana chwila sprzyja wykonaniu określonego działania. Powinieneś w tajemnicy wykonać test Inteligencji Bohatera Gracza. Udany test oznacza, że przepowiednia okazuje się trafna. Nieudany test oznacza, że wróżba okazuje się błędna, choć BG nie zdaje sobie z tego sprawy. Dopóki czar trwa, przepowiednia jest w pełni prawdziwa, potem niekoniecznie musi się sprawdzić. Przed udzieleniem odpowiedzi na pytanie postawione przez czarodzieja rzucającego ten czar, powinieneś uważnie ocenić szanse spełnienia się przepowiedni."
    },
    {
        "name": "Pierwsze proroctwo Amul",
        "domain": "Tradycja Niebios",
        "castingNumber": 6,
        "castingTime": "akcja",
        "ingredient": "odłamek szkła (+1)",
        "duration": "1 runda",
        "description": "Czarodziej przepowiada najbliższą przyszłość, wróżąc z sobie tylko widocznych znaków na niebie. W swojej następnej turze odgrywający go gracz może przerzucić wynik jednej kostki, użytej podczas dowolnego rzutu (testu umiejętności lub cechy, rzutu na obrażenia, ustalenia poziomu mocy, itp.)."
    },
    {
        "name": "Błyskawica",
        "domain": "Tradycja Niebios",
        "castingNumber": 10,
        "castingTime": "akcja",
        "ingredient": "kamerton (+1)",
        "description": "Czarodziej ciska błyskawicą w dowolnego przeciwnika znajdującego się w odległości do 36 metrów. Jest to magiczny pocisk o Sile 5."
    },
    {
        "name": "Drugie proroctwo Amul",
        "domain": "Tradycja Niebios",
        "castingNumber": 12,
        "castingTime": "akcja podwójna",
        "ingredient": "odłamek barwionego szkła (+2)",
        "duration": "1 godzina lub do momentu wykorzystania obu przerzutów",
        "description": "Zaklęcie działa podobnie jak Pierwsze proroctwo Amul, z tą różnicą, że gracz może powtórzyć rzuty dowolnych dwóch kostek."
    },
    {
        "name": "Podmuch wiatru",
        "domain": "Tradycja Niebios",
        "castingNumber": 14,
        "castingTime": "akcja",
        "ingredient": "zwierzęcy pęcherz (+2)",
        "duration": "liczba rund równa wartości Magii czarodzieja",
        "description": "Czarodziej przyzywa gwałtowny wicher na wskazanym obszarze w odległości do 48 metrów. Wszystkie postacie znajdujące się w promieniu 5 metrów wokół wskazanego miejsca przewracają się i muszą wykonać test Odporności. Nieudany test oznacza, że zostają ogłuszone na 1 rundę. W trakcie trwania czaru postacie objęte jego działaniem nie mogą używać broni strzeleckich ani być celem ataków strzeleckich. Poruszanie się w obszarze działania czaru wymaga udanego testu Krzepy, a wszystkie ataki wręcz wykonuje się z modyfikatorem -20."
    },
    {
        "name": "Klątwa",
        "domain": "Tradycja Niebios",
        "castingNumber": 16,
        "castingTime": "akcja",
        "ingredient": "pęknięte zwierciadło (+2)",
        "duration": "24 godziny",
        "description": "Czarodziej rzuca klątwę na dowolną postać znajdującą się w odległości do 24 metrów. Podczas trwania czaru ofiara otrzymuje modyfikator -10 do wszystkich testów. Wszystkie wymierzone w nią ataki zadają dodatkowy 1 punkt obrażeń. Postać może być pod wpływem tylko jednej klątwy w danej chwili."
    },
    {
        "name": "Niebiańskie skrzydła",
        "domain": "Tradycja Niebios",
        "castingNumber": 18,
        "castingTime": "akcja podwójna",
        "ingredient": "gołębie pióro (+2)",
        "duration": "liczba minut równa wartości Magii czarodzieja",
        "description": "Czarodziej przywołuje moc niebios, która unosi go w powietrze. W trakcie trwania czaru może latać z Szybkością 6. Szczegółowe zasady dotyczące latania znajdziesz w Rozdziale VI: Walka, obrażenia i ruch. Czarodziej może rzucić to zaklęcie tylko na siebie."
    },
    {
        "name": "Gwiezdny blask",
        "domain": "Tradycja Niebios",
        "castingNumber": 22,
        "castingTime": "3 akcje",
        "ingredient": "mapa gwiezdna (+3)",
        "duration": "liczba minut równa wartości Magii czarodzieja",
        "description": "Czarodziej czerpie moc z energii niebios, przywołując światło gwiazd. Wskazany obszar w promieniu 48 metrów zostaje oświetlony łagodnym blaskiem, który rozprasza ciemność (zarówno zwykłą, jak i magiczną), ujawnia niewidzialne lub ukryte postacie oraz odkrywa tajemne przejścia i skrytki."
    },
    {
        "name": "Nawałnica",
        "domain": "Tradycja Niebios",
        "castingNumber": 25,
        "castingTime": "akcja podwójna",
        "ingredient": "chorągiewka służąca do ustalania kierunku i siły wiatru (+3)",
        "description": "Czarodziej sięga swoją wolą ku niebiosom, przywołując magiczną burzę z piorunami na dowolnym obszarze w odległości do 48 metrów. Nawałnica, zrodzona z magicznych mocy Eteru, może pojawić się w dowolnym miejscu, także w zamkniętym pomieszczeniu lub pod ziemią. Wszystkie postacie w promieniu 5 metrów wokół wskazanego miejsca otrzymują trafienie z Siłą 5."
    },
    {
        "name": "Mroczne przeznaczenie",
        "domain": "Tradycja Niebios",
        "castingNumber": 31,
        "castingTime": "1 godzina",
        "ingredient": "pętla wisielca (+3)",
        "description": "Czarodziej czerpie surową moc Chaosu i splata ją wokół pukla włosów lub kilku kropel krwi dowolnej istoty, która znajduje się w odległości nie przekraczającej..."
    },
];
var users = [
    {
        _id: new mongoose_1.default.Types.ObjectId("66e9ba372fd89788d886d392"),
        username: 'mix',
        password: (0, bcrypt_1.hashSync)("123", 10),
    },
];
// Database connection
var dbUrl = "mongodb://localhost:27017/taleForge";
mongoose_1.default.connect(dbUrl, {});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to database");
});
var seedDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, examples_1, e, character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, playerCharacterSheet_1.PlayerCharacterSheet.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, skill_1.Skill.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, talent_1.Talent.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, spell_1.Spell.deleteMany({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, item_1.Item.deleteMany({})];
            case 5:
                _a.sent();
                return [4 /*yield*/, armorItem_1.ArmorItem.deleteMany({})];
            case 6:
                _a.sent();
                return [4 /*yield*/, weaponItem_1.WeaponItem.deleteMany({})];
            case 7:
                _a.sent();
                return [4 /*yield*/, user_1.User.deleteMany({})];
            case 8:
                _a.sent();
                return [4 /*yield*/, user_1.User.insertMany(users)
                        .then(function () {
                        console.log("Users added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding Users:", error);
                    })];
            case 9:
                _a.sent();
                return [4 /*yield*/, skill_1.Skill.insertMany(skills)
                        .then(function () {
                        console.log("Skills added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding skills:", error);
                    })];
            case 10:
                _a.sent();
                return [4 /*yield*/, talent_1.Talent.insertMany(talents)
                        .then(function () {
                        console.log("Talents added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding talents:", error);
                    })];
            case 11:
                _a.sent();
                return [4 /*yield*/, spell_1.Spell.insertMany(spells)
                        .then(function () {
                        console.log("Spells added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding spells:", error);
                    })];
            case 12:
                _a.sent();
                return [4 /*yield*/, item_1.Item.insertMany(items)
                        .then(function () {
                        console.log("Items added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding items:", error);
                    })];
            case 13:
                _a.sent();
                return [4 /*yield*/, armorItem_1.ArmorItem.insertMany(armorItems)
                        .then(function () {
                        console.log("Armors added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding armors:", error);
                    })];
            case 14:
                _a.sent();
                return [4 /*yield*/, weaponItem_1.WeaponItem.insertMany(weaponItems)
                        .then(function () {
                        console.log("Weapons added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding weapons:", error);
                    })];
            case 15:
                _a.sent();
                _i = 0, examples_1 = examples;
                _a.label = 16;
            case 16:
                if (!(_i < examples_1.length)) return [3 /*break*/, 19];
                e = examples_1[_i];
                character = new playerCharacterSheet_1.PlayerCharacterSheet(__assign({}, e));
                return [4 /*yield*/, character.save()];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18:
                _i++;
                return [3 /*break*/, 16];
            case 19: return [2 /*return*/];
        }
    });
}); };
seedDB().then(function () {
    mongoose_1.default.connection.close();
    console.log("Seeding Done.");
});
