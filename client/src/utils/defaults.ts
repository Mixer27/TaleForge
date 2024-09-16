import { PlayerStats, Gender, PlayerCharacterSheet, Wealth, Race, WeaponItem } from "../types";


const defaultPlayerStats: PlayerStats = {
    weaponSkills: { name: 'Walka wręcz', starting: 30, advance: 5, current: 35 },
    ballisticSkills: {
        name: 'Umiejętności strzeleckie',
        starting: 25,
        advance: 5,
        current: 30
    },
    strength: { name: 'Krzepa', starting: 40, advance: 10, current: 50 },
    toughness: { name: 'Odporność', starting: 30, advance: 5, current: 35 },
    agility: { name: 'Zręczność', starting: 20, advance: 0, current: 20 },
    intelligence: { name: 'Inteligencja', starting: 25, advance: 5, current: 30 },
    willPower: { name: 'Siła woli', starting: 30, advance: 10, current: 40 },
    fellowship: { name: 'Ogłada', starting: 20, advance: 5, current: 25 },
    attacks: { name: 'Ataki', starting: 1, advance: 1, current: 2 },
    wounds: { name: 'Żywotność', starting: 10, advance: 5, current: 15 },
    magic: { name: 'Magia', starting: 0, advance: 0, current: 0 },
    movement: { name: 'Szybkość', starting: 4, advance: 0, current: 4 },
    strengthBonus: {
        name: 'Siła',
        current: 5,
    },
    toughnessBonus: {
        name: 'Wytrzymałość',
        current: 3,
    },
    insanityPoints: {
        name: 'Punkty obłędu',
        current: 0,
    },
    fatePoints: {
        name: 'Punkty przeznaczenia',
        current: 2,
    }
};

const defaultWealth: Wealth = {
    gc: 0,
    sh: 0,
    pn: 0
};

const defaultArmor = {
    head: {
        item: {
            name: "-",
            description: "-",
            weight: 0,
            value: { ...defaultWealth },
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
            value: { ...defaultWealth },
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
            value: { ...defaultWealth },
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
            value: { ...defaultWealth },
            availability: "-",
        },
        coverLocation: [],
        armor: 0,
    },
};

const defaultPlayerCharacterSheet: PlayerCharacterSheet = {
    _id: "",
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
    wealth: { ...defaultWealth },
};

const defaultWeapon: WeaponItem = {
    item: {
        name: "-",
        description: "-",
        value: { gc: 0, sh: 0, pn: 0 },
        weight: 0,
        availability: "-",
    },
    category: '-',
    range: '-',
    reload: '-',
    strength: '-',
    weaponFeatures: '-'
}



export { defaultPlayerCharacterSheet, defaultWeapon };