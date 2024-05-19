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
    console.log(data)
    res.json(data)
}

export { getPlayerCharacterSheet, getPlayerCharacters }