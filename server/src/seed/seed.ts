import mongoose, { Schema } from "mongoose";
import { PlayerCharacterSheet, SkillLvl } from "../models/playerCharacterSheet";
import { Skill } from "../models/skill";
import { Talent } from "../models/talent"
import { NpcSheet } from "../models/npcSheet";

const examples = [{
    'owner_id': new mongoose.Types.ObjectId(),
    'session_id': new mongoose.Types.ObjectId(),
    'name': 'John Doe',
    'race': 'Elf',
    'currentCareer': 'Adventurer',
    'PreviousCareers': ['Novice', 'Apprentice'],
    'age': 48,
    'gender': 'Male',
    'eyeColor': 'Blue',
    'hairColor': 'Dark',
    'starSign': 'The Big Cross',
    'weight': 76,
    'height': 165,
    'numOfSiblings': 4,
    'birthplace': 'Small Village',
    'distinguishMarks': 'Scar on the left cheek',
    'backstory': 'Lost in the woods and raised by wolves.',
    'armor': {
        'head': 0,
        'l_arm': 0,
        'r_arm': 0,
        'body': 0,
        'l_leg': 0,
        'r_leg': 0,
    },
    'stats': {
        'weaponSkills': { 'starting': 30, 'advance': 5, 'current': 35 },
        'ballisticSkills': { 'starting': 25, 'advance': 5, 'current': 30 },
        'strength': { 'starting': 35, 'advance': 5, 'current': 40 },
        'toughness': { 'starting': 40, 'advance': 5, 'current': 45 },
        'agility': { 'starting': 30, 'advance': 10, 'current': 40 },
        'intelligence': { 'starting': 25, 'advance': 15, 'current': 40 },
        'willPower': { 'starting': 30, 'advance': 10, 'current': 40 },
        'fellowship': { 'starting': 20, 'advance': 10, 'current': 30 },
        'attacks': { 'starting': 1, 'advance': 0, 'current': 1 },
        'wounds': { 'starting': 12, 'advance': 3, 'current': 15 },
        'movement': { 'starting': 4, 'advance': 0, 'current': 4 },
        'magic': { 'starting': 0, 'advance': 1, 'current': 1 },
        'strengthBonus': 4,
        'toughnessBonus': 4,
        'insanityPoints': 4,
        'fatePoints': 2
    },
    'skills': [],
    'talents': [],
    'wealth': {
        'gc': 5,
        'sh': 2,
        'pn': 10,
    }
},
{
    owner_id: new mongoose.Types.ObjectId(),
    session_id: new mongoose.Types.ObjectId(),
    name: "Reinhardt Falken",
    race: "Human",
    currentCareer: "Warrior",
    PreviousCareers: ["Farmer"],
    age: 30,
    gender: "Male",
    eyeColor: "Blue",
    hairColor: "Black",
    starSign: "Leo",
    weight: 180,
    height: 6,
    numOfSiblings: 2,
    birthplace: "Unknown",
    distinguishMarks: "Scar on left cheek",
    backstory: "A seasoned warrior with a mysterious past.",
    armor: {
        head: 2,
        l_arm: 1,
        r_arm: 1,
        body: 3,
        l_leg: 1,
        r_leg: 1,
    },
    stats: {
        weaponSkills: { starting: 30, advance: 5, current: 35 },
        ballisticSkills: { starting: 25, advance: 5, current: 30 },
        strength: { starting: 40, advance: 10, current: 50 },
        toughness: { starting: 30, advance: 5, current: 35 },
        agility: { starting: 20, advance: 0, current: 20 },
        intelligence: { starting: 25, advance: 5, current: 30 },
        willPower: { starting: 30, advance: 10, current: 40 },
        fellowship: { starting: 20, advance: 5, current: 25 },
        attacks: { starting: 1, advance: 1, current: 2 },
        wounds: { starting: 10, advance: 5, current: 15 },
        magic: { starting: 0, advance: 0, current: 0 },
        movement: { starting: 4, advance: 0, current: 4 },
        strengthBonus: 5,
        toughnessBonus: 3,
        insanityPoints: 0,
        fatePoints: 2,
    },
    skills: [
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f5'), // Replace with actual ObjectId for Animal Care
            lvl: SkillLvl.NORMAL,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f6'), // Replace with actual ObjectId for Dodge Blow
            lvl: SkillLvl.ADVANCED,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f7'), // Replace with actual ObjectId for Heal
            lvl: SkillLvl.NORMAL,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f8'), // Replace with actual ObjectId for Perception
            lvl: SkillLvl.EXPERT,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f9'), // Replace with actual ObjectId for Intimidate
            lvl: SkillLvl.ADVANCED,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fd'), // Replace with actual ObjectId for Intimidate
            lvl: SkillLvl.ADVANCED,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fe'), // Replace with actual ObjectId for Heal
            lvl: SkillLvl.NORMAL,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67ff'), // Replace with actual ObjectId for Heal
            lvl: SkillLvl.NORMAL,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d6800'), // Replace with actual ObjectId for Heal
            lvl: SkillLvl.NORMAL,
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d6801'), // Replace with actual ObjectId for Perception
            lvl: SkillLvl.EXPERT,
        },
    ],
    talents: [],
    wealth: {
        gc: 10,
        sh: 20,
        pn: 30,
    }
}
]

// Skills
const skills = [
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f5'),
        name: "Animal Care",
        relatedStatName: "intelligence", // In WFRP, Animal Care is based on Intelligence
        advanced: false,
        description: "Allows you to take care of and treat common domestic animals."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f6'),
        name: "Charm Animal",
        relatedStatName: "fellowship", // Charm Animal is typically based on Fellowship
        advanced: false,
        description: "Helps you calm or charm animals through gentle interaction."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f7'),
        name: "Dodge Blow",
        relatedStatName: "agility", // Dodge Blow is based on Agility
        advanced: false,
        description: "Allows you to dodge incoming blows in combat."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f8'),
        name: "Heal",
        relatedStatName: "intelligence", // Heal is based on Intelligence
        advanced: false,
        description: "Allows you to treat wounds and prevent bleeding, as well as aiding recovery from injuries."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f9'),
        name: "Perception",
        relatedStatName: "intelligence", // Perception is based on Intelligence
        advanced: false,
        description: "Allows you to spot hidden objects or detect dangers around you."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fa'),
        name: "Ride",
        relatedStatName: "agility", // Ride is based on Agility
        advanced: false,
        description: "Helps you ride and control a mount, such as a horse or similar creatures."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fb'),
        name: "Intimidate",
        relatedStatName: "strength", // Intimidate is based on Strength
        advanced: false,
        description: "Allows you to force others into submission through sheer physical presence or verbal threats."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fc'),
        name: "Swim",
        relatedStatName: "strength", // Swim is based on Strength
        advanced: false,
        description: "Allows you to swim in water, avoiding drowning or getting swept away by currents."
    },
    // ADVANCED
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fd'),
        name: "Alchemy",
        relatedStatName: "intelligence", // Alchemy is based on Intelligence
        advanced: true,
        description: "Allows you to create potions, poisons, and other alchemical substances."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67fe'),
        name: "Arcane Language",
        relatedStatName: "intelligence", // Arcane Language is based on Intelligence
        advanced: true,
        description: "Allows you to read and understand magical tomes and communicate in mystical languages."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67ff'),
        name: "Disguise",
        relatedStatName: "fellowship", // Disguise is based on Fellowship
        advanced: true,
        description: "Allows you to disguise yourself or others to blend into different social or cultural groups."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d6800'),
        name: "Navigation",
        relatedStatName: "intelligence", // Navigation is based on Intelligence
        advanced: true,
        description: "Allows you to find your way through wilderness, seas, or unknown cities using maps and landmarks."
    },
    {
        _id: new mongoose.Types.ObjectId('66d82a3046f4cd59924d6801'),
        name: "Tactics",
        relatedStatName: "intelligence", // Tactics is based on Intelligence
        advanced: true,
        description: "Gives you the ability to plan and execute complex battle strategies during warfare or smaller skirmishes."
    }

];

const talents = [
    {
      name: "Acute Hearing",
      description: "Your hearing is exceptionally keen. You gain a +20% bonus on all Perception Skill Tests involving hearing."
    },
    {
      name: "Ambidextrous",
      description: "You can use both hands equally well. You do not suffer the normal -20% penalty for using your off hand in combat or other tests."
    },
    {
      name: "Coolheaded",
      description: "Your mind is cool under pressure. You gain a permanent +5% bonus to your Willpower characteristic."
    },
    {
      name: "Fleet Footed",
      description: "You are quicker than most. Your Movement increases by 1."
    },
    {
      name: "Hardy",
      description: "You are in excellent physical condition. You gain a permanent +1 Wound."
    },
    {
      name: "Lightning Reflexes",
      description: "Your reflexes are extraordinarily fast. You gain a permanent +5% bonus to your Agility characteristic."
    },
    {
      name: "Night Vision",
      description: "You can see well in darkness. You can see in low light up to 30 yards (15 squares) without penalty."
    },
    {
      name: "Quick Draw",
      description: "You have trained to be lightning quick when drawing a weapon. You may ready a weapon as a Free Action instead of a Half Action."
    },
    {
      name: "Resistance to Poison",
      description: "You are resistant to poisons and toxins. You gain a +10% bonus on all Toughness Tests to resist the effects of poison."
    },
    {
      name: "Strike Mighty Blow",
      description: "Your melee attacks hit with increased force. You gain a +1 bonus to damage on all melee attacks."
    },
    {
      name: "Very Resilient",
      description: "Your body is tougher than most. You gain a permanent +5% bonus to your Toughness characteristic."
    },
    {
      name: "Warrior Born",
      description: "You have an innate talent for combat. You gain a permanent +5% bonus to your Weapon Skill characteristic."
    }
  ];  

// Database connection
const dbUrl = "mongodb://localhost:27017/taleForge";
mongoose.connect(dbUrl, {})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to database");
});

const seedDB = async () => {
    await PlayerCharacterSheet.deleteMany({});
    await Skill.deleteMany({});
    await Talent.deleteMany({});
    Skill.insertMany(skills)
        .then(() => {
            console.log("Skills added successfully!");
        })
        .catch((error) => {
            console.error("Error adding skills:", error);
        });
    Talent.insertMany(talents)
        .then(() => {
            console.log("Talents added successfully!");
        })
        .catch((error) => {
            console.error("Error adding talents:", error);
        });
    for (const e of examples) {
        const character = new PlayerCharacterSheet({ ...e });
        await character.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Seeding Done.");
})