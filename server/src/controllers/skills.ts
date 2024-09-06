import { Skill } from "../models/skill";
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

const getSkills = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Skill.find({});
    res.json(data);
}

export {getSkills};