import { Talent } from "../models/talent";
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

const getTalents = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Talent.find({});
    res.json(data);
}

export { getTalents };