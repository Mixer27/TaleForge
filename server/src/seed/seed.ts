import mongoose, { Schema } from "mongoose";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { Skill } from "../models/skill";
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
            lvl: 'Normal',
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f6'), // Replace with actual ObjectId for Dodge Blow
            lvl: 'Advanced',
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f7'), // Replace with actual ObjectId for Heal
            lvl: 'Normal',
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f8'), // Replace with actual ObjectId for Perception
            lvl: 'Normal',
        },
        {
            skill: new mongoose.Types.ObjectId('66d82a3046f4cd59924d67f9'), // Replace with actual ObjectId for Intimidate
            lvl: 'Advanced',
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
        name: "Animal Care",
        relatedStatName: "intelligence", // In WFRP, Animal Care is based on Intelligence
        description: "Allows you to take care of and treat common domestic animals."
    },
    {
        name: "Charm Animal",
        relatedStatName: "fellowship", // Charm Animal is typically based on Fellowship
        description: "Helps you calm or charm animals through gentle interaction."
    },
    {
        name: "Dodge Blow",
        relatedStatName: "agility", // Dodge Blow is based on Agility
        description: "Allows you to dodge incoming blows in combat."
    },
    {
        name: "Heal",
        relatedStatName: "intelligence", // Heal is based on Intelligence
        description: "Allows you to treat wounds and prevent bleeding, as well as aiding recovery from injuries."
    },
    {
        name: "Perception",
        relatedStatName: "intelligence", // Perception is based on Intelligence
        description: "Allows you to spot hidden objects or detect dangers around you."
    },
    {
        name: "Ride",
        relatedStatName: "agility", // Ride is based on Agility
        description: "Helps you ride and control a mount, such as a horse or similar creatures."
    },
    {
        name: "Intimidate",
        relatedStatName: "strength", // Intimidate is based on Strength
        description: "Allows you to force others into submission through sheer physical presence or verbal threats."
    },
    {
        name: "Swim",
        relatedStatName: "strength", // Swim is based on Strength
        description: "Allows you to swim in water, avoiding drowning or getting swept away by currents."
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
    // await Skill.deleteMany({});
    // Skill.insertMany(skills)
    //     .then(() => {
    //         console.log("Skills added successfully!");
    //     })
    //     .catch((error) => {
    //         console.error("Error adding skills:", error);
    //     });
    for (const e of examples) {
        const character = new PlayerCharacterSheet({ ...e });
        await character.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Seeding Done.");
})