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
    lvl: {
        type: String,
        enum: Object.values(SkillLvl),
    },
})

const TalentSchema = new Schema({
    talent: {
        type: Schema.Types.ObjectId,
        ref: 'Talent',
    }
})

const PlayerCharacterSchema = new Schema({
    name: String,
    race: {
        type: String,
        enum: Object.values(Race),
    },
    currentCareer: String,
    PreviousCareers: [String],
    age: Number,
    gender: {
        type: String,
        enum: Object.values(Gender),
    },
    eyeColor: String,
    hairColor: String,
    starSign: String,
    weight: Number,
    height: Number,
    numOfSiblings: Number,
    birthplace: String,
    distinguishMarks: String,
    backstory: String,
    armor: ArmorSchema,
    stats: PlayerStatsSchema,
    skills: [SkillLvlSchema],
    talents: [TalentSchema],
    wealth: {
        gc: Number,
        sh: Number,
        pn: Number,
    }
})

const PlayerCharacterSheet = mongoose.model("PlayerCharacterSheet", PlayerCharacterSchema);

export { ArmorSchema, SkillLvlSchema, TalentSchema, PlayerCharacterSheet };