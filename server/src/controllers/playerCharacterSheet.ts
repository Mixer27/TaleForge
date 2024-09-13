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
    const data = await PlayerCharacterSheet.find({})
    // console.log(data)
    res.json(data)
}

const updatePlayerCharacterSheet = async (req: Request, res: Response, next: NextFunction) => {
    const { id} = req.params;
    const updates = req.body;


    let data = await PlayerCharacterSheet.findByIdAndUpdate(id, updates, { new: true });
    // if (back) {

    //     const data = await PlayerCharacterSheet.findById(id)
    //         .populate({
    //             path: "skills",
    //             populate: {
    //                 path: 'skill',
    //                 model: 'Skill',
    //             }
    //         })
    //         .populate({
    //             path: "talents",
    //             populate: {
    //                 path: 'talent',
    //                 model: 'Talent'
    //             }
    //         })
    //         .populate({
    //             path: "spells",
    //             populate: {
    //                 path: "spell",
    //                 model: "Spell",
    //             }
    //         });
    // }
    console.log(updates, data);
    res.send(data);
}

const getNewId = async (req: Request, res: Response, next: NextFunction) => {
    const data = new mongoose.Types.ObjectId();
    console.log(data);
    res.send(data);

}

// const addPlayerCharacterSheetItem = async (req: Request, res: Response, next: NextFunction) => {

// }

export { getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet, getNewId }