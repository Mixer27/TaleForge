import { Spell } from "../models/spell"
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

const getSpells = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Spell.find({});
    res.json(data);
}

export { getSpells };