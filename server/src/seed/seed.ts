import mongoose, { Schema } from "mongoose";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
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
        'strengthBonus': 4,
        'toughnessBonus': 4,
        'movement': { 'starting': 4, 'advance': 0, 'current': 4 },
        'magic': { 'starting': 0, 'advance': 1, 'current': 1 },
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
        strengthBonus: 5,
        toughnessBonus: 3,
        magic: { starting: 0, advance: 0, current: 0 },
        movement: { starting: 4, advance: 0, current: 4 },
        insanityPoints: 0,
        fatePoints: 2,
    },
    skills: [],
    talents: [],
    wealth: {
        gc: 10,
        sh: 20,
        pn: 30,
    }
}
]

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
    for (const e of examples) {
        const character = new PlayerCharacterSheet({ ...e });
        await character.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Seeding Done.");
})