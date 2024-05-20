import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet } from "../controllers/playerCharacterSheet";


const router = Router()

router.route("/")
    .get(catchAsync(getPlayerCharacters));

router.route("/:id")
    .get(catchAsync(getPlayerCharacterSheet))
    .patch(catchAsync(updatePlayerCharacterSheet))

export { router as pcsheetRoutes }