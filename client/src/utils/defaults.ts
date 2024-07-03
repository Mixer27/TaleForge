import { PlayerStats, Gender, PlayerCharacterSheet, PlayerStat, Wealth, Armor, Race } from "../types";

const defaultPlayerStat: PlayerStat = {
    starting: 0,
    advance: 0,
    current: 0
};


const defaultPlayerStats: PlayerStats = {
    weaponSkills: { ...defaultPlayerStat },
    ballisticSkills: { ...defaultPlayerStat },
    strength: { ...defaultPlayerStat },
    toughness: { ...defaultPlayerStat },
    agility: { ...defaultPlayerStat },
    intelligence: { ...defaultPlayerStat },
    willPower: { ...defaultPlayerStat },
    fellowship: { ...defaultPlayerStat },
    attacks: { ...defaultPlayerStat },
    wounds: { ...defaultPlayerStat },
    magic: { ...defaultPlayerStat },
    movement: { ...defaultPlayerStat },
    strengthBonus: 0,
    toughnessBonus: 0,
    insanityPoints: 0,
    fatePoints: 0
};

const defaultWealth: Wealth = {
    gc: 0,
    sh: 0,
    pn: 0
};

const defaultArmor: Armor = {
    head: 0,
    arms: 0,
    body: 0,
    legs: 0,
}

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
    stats: { ...defaultPlayerStats },
    armor: { ...defaultArmor },
    skills: [],
    talents: [],
    wealth: { ...defaultWealth },
};




export { defaultPlayerStats, defaultPlayerCharacterSheet, defaultPlayerStat, defaultWealth, defaultArmor}