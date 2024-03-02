import mongoose from "mongoose";
import { Schema } from "mongoose";

enum Race {
    HALFLING = "Halfing",
    HUMAN = "Human",
    ELF = "Elf",
    DWARF = "Dwarf",
}
enum Gender {
    MALE = "Male",
    FEMALE = "Female",
}

enum SkillLvl {
    NORMAL = "Normal",
    ADVANCED = "Advanced",
    EXPERT = "Expert",
}

const ArmorSchema = new Schema({
    head: Number,
    arms: Number,
    body: Number,
    legs: Number,
});

const PlayerStatSchema = new Schema({
    starting: Number,
    advance: Number,
    current: Number,
});

const PlayerStatsSchema: Schema = new Schema({
    weaponSkills: PlayerStatSchema,
    ballisticSkills: PlayerStatSchema,
    strength: PlayerStatSchema,
    toughness: PlayerStatSchema,
    agility: PlayerStatSchema,
    intelligence: PlayerStatSchema,
    willPower: PlayerStatSchema,
    fellowship: PlayerStatSchema,
    attacks: PlayerStatSchema,
    wounds: PlayerStatSchema,
    magic: PlayerStatSchema,
    movement: PlayerStatSchema,
    insanityPoints: Number,
    fatePoints: Number,
})

const SkillLvlSchema = new Schema({
    skill: {
        type: Schema.Types.ObjectId,
        ref: 'Skill',
    },
    lvl: SkillLvl,
})

const TalentSchema = new Schema({
    type: [Schema.Types.ObjectId],
    ref: 'Talent'
})

const PlayerCharacterSchema = new Schema({
    name: String,
    race: Race,
    currentCareer: String,
    PreviousCareers: [String],
    age: Number,
    gender: Gender,
    eyeColor: String,
    hairColor: String,
    starSign: String,
    weight: Number,
    height: Number,
    numOfSiblings: Number,
    birthplace: String,
    distinguishMarks: String,
    backstory: String,
    stats: PlayerStatsSchema,
    skills: [SkillLvlSchema],
    talents: [TalentSchema],
})

const PlayerCharacterSheet = mongoose.model("PlayerCharacterSheet", PlayerCharacterSchema); 

export { ArmorSchema, SkillLvlSchema, TalentSchema, PlayerCharacterSheet };