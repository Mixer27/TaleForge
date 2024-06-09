import { NextFunction, Response, Request } from "express";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";

interface reqParams {
    id: string,
}

const getPlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = await PlayerCharacterSheet.findById(id)
        .populate("skills")
        .populate("talents");
    res.json(data);
    // res.send("aaa");
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