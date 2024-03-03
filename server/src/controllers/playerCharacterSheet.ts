import { NextFunction, Response, Request } from "express";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";

interface reqParams {
    id: string,
}

const getPlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    const data = await PlayerCharacterSheet.findById(id)
        .populate("skills")
        .populate("talents");
    res.json(data);
    // res.send("aaa");
}

export { getPlayerCharacterSheet }