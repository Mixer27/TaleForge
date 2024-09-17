import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { deletePlayerCharacterSheet, getNewId, getPlayerCharacterSheet, getPlayerCharacters, postPlayerCharacterSheet, updatePlayerCharacterSheet } from "../controllers/playerCharacterSheet";
import { checkUserSession } from "../controllers/auth";


const router = Router()

router.route("/")
    .get(catchAsync(getPlayerCharacters))
    .post(checkUserSession, catchAsync(postPlayerCharacterSheet))
    .delete(checkUserSession, catchAsync(deletePlayerCharacterSheet))
router.route("/new_id")
    .get(catchAsync(getNewId))
router.route("/:id")
    .get(catchAsync(getPlayerCharacterSheet))
    .patch(checkUserSession, catchAsync(updatePlayerCharacterSheet))



export { router as pcsheetRoutes }