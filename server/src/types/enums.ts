const Race = Object.freeze({
    HALFLING: "Niziołek",
    HUMAN: "Człowiek",
    ELF: "Elf",
    DWARF: "Krasnolud",
});
const Gender = Object.freeze({
    MALE: "Mężczyzna",
    FEMALE: "Kobieta",
    OTHER: "Inne"
});
const SkillLvl = Object.freeze({
    NORMAL: "Posiadane",
    ADVANCED: "+10%",
    EXPERT: "+20%",
});
const StatName = Object.freeze({
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

export { Race, Gender, SkillLvl, StatName };