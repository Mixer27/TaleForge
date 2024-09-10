import { Item } from "../models/item";
import { ArmorItem } from "../models/armorItem";
import { WeaponItem } from "../models/weaponItem";
import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Item.find({});
    res.json(data);
}

const getArmorItems = async (req: Request, res: Response, next: NextFunction) => {
    const data = await ArmorItem.find({});
    res.json(data);
}

const getWeaponItems = async (req: Request, res: Response, next: NextFunction) => {
    const data = await WeaponItem.find({});
    res.json(data);
}

export {getItems, getArmorItems, getWeaponItems};