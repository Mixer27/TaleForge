import { Gender, Race } from "./enums";
// import { PlayerCharacterSheet, PlayerStats } from "../models/playerCharacterSheet";
import mongoose from "mongoose";

const defaultPlayerStats = {
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


const defaultMoney = {
    gc: 0,
    sh: 0,
    pn: 0,
}

const defaultArmor = {
    head: {
        item: {
            name: "-",
            description: "-",
            weight: 0,
            value: { ...defaultMoney },
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
            value: { ...defaultMoney },
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
            value: { ...defaultMoney },
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
            value: { ...defaultMoney },
            availability: "-",
        },
        coverLocation: [],
        armor: 0,
    },
};

const defaultPlayerCharacterSheet = {
    // _id: "",
    owner_id: new mongoose.Types.ObjectId(),
    name: "",
    race: Race.HUMAN,
    currentCareer: "",
    PreviousCareers: [],
    age: 0,
    gender: Gender.OTHER,
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
    stats: { ...defaultPlayerStats },
    armor: { ...defaultArmor },
    items: [],
    weapons: [],
    skills: [],
    talents: [],
    spells: [],
    wealth: { ...defaultMoney },
};



export { defaultPlayerCharacterSheet, defaultMoney, defaultArmor };