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
        let data = await PlayerCharacterSheet.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        console.log(updates, data);
        res.status(200).send(data);
        return
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating character sheet" });
        return
    }
}

const getNewId = async (req: Request, res: Response, next: NextFunction) => {
    const data = new mongoose.Types.ObjectId();
    console.log(data);
    res.send(data);

}

// const addPlayerCharacterSheetItem = async (req: Request, res: Response, next: NextFunction) => {

// }

export { getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet, getNewId }