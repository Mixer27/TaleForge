import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { Skill } from "../models/skill";
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

interface reqParams {
    id: string,
}

const getPlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(mongoose.modelNames());
    const data = await PlayerCharacterSheet.findById(id)
        .populate({
            path: "skills",
            populate: {
                path: 'skill',
                model: 'Skill',
            }
        })
        .populate({
            path: "talents",
            populate: {
                path: 'talent',
                model: 'Talent'
            }
        })
        .populate({
            path: "spells",
            populate: {
                path: "spell",
                model: "Spell",
            }
        });
    res.json(data);
}

const getPlayerCharacters = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.session.user_id;
    const data = await PlayerCharacterSheet.find({ owner_id: user_id });
    // const data = await PlayerCharacterSheet.find();
    console.log(user_id, data);
    // console.log(data)
    res.json(data)
}

const updatePlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user_id = req.session.user_id;
    const { id } = req.params;
    const updates = req.body;

    try {
        const character = await PlayerCharacterSheet.findById(id);
        if (!character) {
            res.status(404).send({ message: "Character sheet not found." });
            return
        }

        if (character?.owner_id.toString() !== user_id) {
            res.status(403).send({ message: "You dont have permission to update this character sheet" });
            return
        }
        // let data = await PlayerCharacterSheet.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        character.set(updates);
        // character.wealth.gc = -5; // Ustaw nieprawidłową wartość
        // character.markModified('wealth');
        // console.log(await character.validate());
        await character.save();
        // console.log(updates, character);
        res.status(200).send(character);
        return
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating character sheet" });
        return
    }
}

const getNewId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = new mongoose.Types.ObjectId();
        console.log(data);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Error getting unique ID" });
    } 

}

// const addPlayerCharacterSheetItem = async (req: Request, res: Response, next: NextFunction) => {

// }

export { getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet, getNewId }