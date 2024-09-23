"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatName = exports.SkillLvl = exports.Gender = exports.Race = void 0;
var Race = Object.freeze({
    HALFLING: "Niziołek",
    HUMAN: "Człowiek",
    ELF: "Elf",
    DWARF: "Krasnolud",
});
exports.Race = Race;
var Gender = Object.freeze({
    MALE: "Mężczyzna",
    FEMALE: "Kobieta",
    OTHER: "Inne"
});
exports.Gender = Gender;
var SkillLvl = Object.freeze({
    NORMAL: "Posiadane",
    ADVANCED: "+10%",
    EXPERT: "+20%",
});
exports.SkillLvl = SkillLvl;
var StatName = Object.freeze({
    WEAPON_SKILLS: "Walka wręcz",
    BALLISTIC_SKILLS: "Umiejętności strzeleckie",
    STRENGTH: "Krzepa",
    TOUGHNESS: "Odporność",
    AGILITY: "Zręczność",
    INTELLIGENCE: "Inteligencja",
    WILL_POWER: "Siła woli",
    FELLOWSHIP: "Ogłada",
    ATTACKS: "Ataki",
    WOUNDS: "Żywotność",
    MAGIC: "Magia",
    MOVEMENT: "Szybkość",
    STRENGTH_BONUS: "Siła",
    TOUGHNESS_BONUS: "Wytrzymałość",
    INSANITY_POINTS: "Punkty obłędu",
    FATE_POINTS: "Punkty przeznaczenia",
});
exports.StatName = StatName;
