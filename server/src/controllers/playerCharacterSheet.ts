import { NextFunction, Response, Request } from "express";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";

const getPlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    const data = await PlayerCharacterSheet.findById("65e34fb6736db72bf5f9abbe")
        .populate("skills")
        .populate("talents");
    res.json(data);
    // res.send("aaa");
}

export { getPlayerCharacterSheet }