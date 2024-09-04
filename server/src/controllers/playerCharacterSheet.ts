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
    // .populate("skills skill")
        .populate({
        path: "skills",
        populate: {
            path: 'skill',
            model: 'Skill',
        }
    })
    .populate("talents");
res.json(data);
// console.log(data?.skills);
}

const getPlayerCharacters = async (req: Request, res: Response, next: NextFunction) => {
    const data = await PlayerCharacterSheet.find({})
    // console.log(data)
    res.json(data)
}

const updatePlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedSheet = await PlayerCharacterSheet.findByIdAndUpdate(id, updates, { new: true });
    res.send(updatedSheet);
}

export { getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet }