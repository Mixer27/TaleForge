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
var enums_1 = require("../utils/enums");
var item_1 = require("../models/item");
var armorItem_1 = require("../models/armorItem");
var weaponItem_1 = require("../models/weaponItem");
var defaultMoney = {
    gc: 0,
    sh: 0,
    pn: 0,
};
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
        'owner_id': new mongoose_1.default.Types.ObjectId(),
        'session_id': new mongoose_1.default.Types.ObjectId(),
        'name': 'Jan Kowalski',
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
        armor: defaultArmor,
    },
    {
        owner_id: new mongoose_1.default.Types.ObjectId(),
        session_id: new mongoose_1.default.Types.ObjectId(),
        name: "Reinhardt Falken",
        race: enums_1.Race.HUMAN,
        currentCareer: "Wojownik",
        PreviousCareers: ["Rolnik"],
        age: 30,
        gender: enums_1.Gender.MALE,
        eyeColor: "Niebieskie",
        hairColor: "Czarne",
        starSign: "Lew",
        weight: 82, // Zmieniłem jednostki na kilogramy
        height: 183, // Zmieniłem jednostki na centymetry
        numOfSiblings: 2,
        birthplace: "Nieznane",
        distinguishMarks: "Blizna na lewym policzku",
        backstory: "Doświadczony wojownik o tajemniczej przeszłości.",
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
        armor: defaultArmor,
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
    }
];
var spells = [
    {
        name: "Gra pozorów",
        domain: "Ścieżka Główna",
        castingNumber: 5,
        castingTime: "Natychmiast",
        ingredient: "Lustro",
        description: "Pozwala na stworzenie iluzji, która oszukuje przeciwników.",
    },
    {
        name: "Sobowtór",
        domain: "Ścieżka Główna",
        castingNumber: 8,
        castingTime: "2 rundy",
        ingredient: "Fragment włosów",
        description: "Tworzy identyczną kopię czarodzieja, która może wprowadzać w błąd.",
    },
    {
        name: "Luka w pamięci",
        domain: "Ścieżka Główna",
        castingNumber: 10,
        castingTime: "3 rundy",
        ingredient: "Fragment pergaminu",
        description: "Wymazuje wybrane wspomnienie z pamięci ofiary.",
    },
    {
        name: "Rumak z cieni",
        domain: "Ścieżka Główna",
        castingNumber: 12,
        castingTime: "1 minuta",
        ingredient: "Czarny jedwab",
        description: "Tworzy rumaka z cienia, który jest szybszy od przeciętnego konia.",
    },
    {
        name: "Maska iluzji",
        domain: "Ścieżka Główna",
        castingNumber: 6,
        castingTime: "1 runda",
        ingredient: "Maska teatralna",
        description: "Czarodziej przyjmuje inny wygląd, by oszukać obserwatorów.",
    }
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
                return [4 /*yield*/, skill_1.Skill.insertMany(skills)
                        .then(function () {
                        console.log("Skills added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding skills:", error);
                    })];
            case 8:
                _a.sent();
                return [4 /*yield*/, talent_1.Talent.insertMany(talents)
                        .then(function () {
                        console.log("Talents added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding talents:", error);
                    })];
            case 9:
                _a.sent();
                return [4 /*yield*/, spell_1.Spell.insertMany(spells)
                        .then(function () {
                        console.log("Spells added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding spells:", error);
                    })];
            case 10:
                _a.sent();
                return [4 /*yield*/, item_1.Item.insertMany(items)
                        .then(function () {
                        console.log("Items added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding items:", error);
                    })];
            case 11:
                _a.sent();
                return [4 /*yield*/, armorItem_1.ArmorItem.insertMany(armorItems)
                        .then(function () {
                        console.log("Armors added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding armors:", error);
                    })];
            case 12:
                _a.sent();
                return [4 /*yield*/, weaponItem_1.WeaponItem.insertMany(weaponItems)
                        .then(function () {
                        console.log("Weapons added successfully!");
                    })
                        .catch(function (error) {
                        console.error("Error adding weapons:", error);
                    })];
            case 13:
                _a.sent();
                _i = 0, examples_1 = examples;
                _a.label = 14;
            case 14:
                if (!(_i < examples_1.length)) return [3 /*break*/, 17];
                e = examples_1[_i];
                character = new playerCharacterSheet_1.PlayerCharacterSheet(__assign({}, e));
                return [4 /*yield*/, character.save()];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                _i++;
                return [3 /*break*/, 14];
            case 17: return [2 /*return*/];
        }
    });
}); };
seedDB().then(function () {
    mongoose_1.default.connection.close();
    console.log("Seeding Done.");
});
