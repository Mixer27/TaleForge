import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { Skill } from "../models/skill";
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import { defaultPlayerCharacterSheet } from "../utils/defaults";

interface reqParams {
    id: string,
}

const getPlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        // console.log(mongoose.modelNames());
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
        // if (req.session.user_id !== data?.owner_id.toString()) {
        //     res.status(401).send({ message: "Unauthorized access to characeter sheet" });
        //     return;
        // }
        res.json(data);

    } catch (err) {
        res.status(500).send({ message: "Error fetching character sheet" + err });
    }
}

const getPlayerCharacters = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.session.user_id;
    const data = await PlayerCharacterSheet.find({ owner_id: user_id });
    // const data = await PlayerCharacterSheet.find();
    // console.log(user_id, data);
    // console.log(data)
    res.json(data)
}

const postPlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.session.user_id) {
            res.status(403).send("You don't have permission to do that");
            return
        }
        const user_id = req.session.user_id;
        const character = new PlayerCharacterSheet({ ...defaultPlayerCharacterSheet, owner_id: user_id, name: "Nowa postać" });
        // const character = new PlayerCharacterSheet({...defaultPlayerCharacterSheet, name: "aaa"});
        await character.save();
        res.status(200).send(character);
    } catch (err) {
        res.status(500).send({ message: "Error adding character sheet" + err });
    }
}

const updatePlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user_id = req.session.user_id;
    const { id } = req.params;
    const updates = req.body;

    try {
        let character = await PlayerCharacterSheet.findById(id);
        if (!character) {
            res.status(404).send({ message: "Character sheet not found." });
            return
        }

        if (character?.owner_id.toString() !== user_id) {
            res.status(403).send({ message: "You dont have permission to update this character sheet" });
            return
        }
        character = await PlayerCharacterSheet.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        // console.log(updates, character);
        res.status(200).send(character);
        return
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error updating character sheet" });
        return
    }
}

const deletePlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user_id = req.session.user_id;
    const { id } = req.params;
    try {
        const character = await PlayerCharacterSheet.findById(id);
        // if (!user_id) {
        //     res.status(401).send({ message: "User not authenticated" });
        //     return;
        // }
        if (character?.owner_id.toString() !== user_id) {
            res.status(403).send({ message: "You dont have permission to update this character sheet" });
            return
        }
        await character?.deleteOne();
        // await PlayerCharacterSheet.findByIdAndDelete(id);
        res.status(200).send({ message: "Character deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting character sheet" + err });
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

export { getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet, getNewId, postPlayerCharacterSheet, deletePlayerCharacterSheet }