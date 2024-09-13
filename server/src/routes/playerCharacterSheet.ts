import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { getNewId, getPlayerCharacterSheet, getPlayerCharacters, updatePlayerCharacterSheet } from "../controllers/playerCharacterSheet";


const router = Router()

router.route("/")
    .get(catchAsync(getPlayerCharacters));
router.route("/new_id")
    .get(catchAsync(getNewId))
router.route("/:id")
    .get(catchAsync(getPlayerCharacterSheet))
    .patch(catchAsync(updatePlayerCharacterSheet))



export { router as pcsheetRoutes }