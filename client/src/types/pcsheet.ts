// Definicje Enum
enum Race {
    HALFLING = "Halfing",
    HUMAN = "Human",
    ELF = "Elf",
    DWARF = "Dwarf",
}

enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

enum SkillLvl {
    NORMAL = "Posiadane",
    ADVANCED = "+10%",
    EXPERT = "+20%",
}

// Interfejsy pomocnicze
interface Armor {
    head: number;
    arms: number;
    body: number;
    legs: number;
}

interface SingleStat {
    name: string;
    current: number;
}

interface PlayerStat {
    name: string,
    starting: number;
    advance: number;
    current: number;
}

interface PlayerStats {
    // [key: string]: unknown | undefined,
    weaponSkills?: PlayerStat;
    ballisticSkills?: PlayerStat;
    strength?: PlayerStat;
    toughness?: PlayerStat;
    agility?: PlayerStat;
    intelligence?: PlayerStat;
    willPower?: PlayerStat;
    fellowship?: PlayerStat;
    attacks?: PlayerStat;
    wounds?: PlayerStat;
    magic?: PlayerStat;
    movement?: PlayerStat;
    strengthBonus?: SingleStat;
    toughnessBonus?: SingleStat;
    insanityPoints?: SingleStat;
    fatePoints?: SingleStat;
}

interface Skill {
    _id: string,
    name: string,
    advanced: boolean,
    relatedStatName: string,
    description: string,
}

interface SkillwLvl {
    skill: Skill,
    lvl: SkillLvl; // 'Normal', 'Advanced', 'Expert'
}

interface Talent {
    _id: string,
    name: string;
    description: string;
}

interface TalentObject {
    talent: Talent
}

interface Spell {
    _id: string,
    name: string,
    domain: string,
    castingNumber: number,
    castingTime: string,
    ingredient: string,
    description: string,
}

interface SpellObject {
    spell: Spell
}

interface Wealth {
    gc: number;
    sh: number;
    pn: number;
}

// Główny interfejs dla PlayerCharacterSheet
interface PlayerCharacterSheet {
    _id: string,
    name: string;
    race: Race;
    currentCareer: string;
    PreviousCareers: string[];
    age: number;
    gender: Gender;
    eyeColor: string;
    hairColor: string;
    starSign: string;
    weight: number;
    height: number;
    numOfSiblings: number;
    birthplace: string;
    distinguishMarks: string;
    backstory: string;
    stats: PlayerStats;
    armor: Armor,
    skills: SkillwLvl[],
    talents: TalentObject[],
    spells: SpellObject[],
    wealth: Wealth;
}

const CharacterSheetTab = {
    Stats: "Stats",
    Skills: "Skills",
    Talents: "Talents",
    Spells: "Spells",
    Inventory: "Inventory",
    Details: "Details",

} as const;

export type { PlayerCharacterSheet, PlayerStats, PlayerStat, SingleStat, Wealth, Armor, SkillwLvl, Skill, Talent, TalentObject, Spell, SpellObject };
export { CharacterSheetTab, Gender, Race, SkillLvl }