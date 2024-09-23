import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { deletePlayerCharacterSheet, getNewId, getPlayerCharacterSheet, getPlayerCharacters, addPlayerCharacterSheet, updatePlayerCharacterSheet } from "../controllers/playerCharacterSheet";
import { checkUserSession } from "../controllers/auth";


const router = Router()

router.route("/")
    .get(catchAsync(getPlayerCharacters))
    .post(checkUserSession, catchAsync(addPlayerCharacterSheet))
    router.route("/new_id")
    .get(catchAsync(getNewId))
    router.route("/:id")
    .get(checkUserSession, catchAsync(getPlayerCharacterSheet))
    .put(checkUserSession, catchAsync(updatePlayerCharacterSheet))
    .delete(checkUserSession, catchAsync(deletePlayerCharacterSheet))



export { router as pcsheetRoutes }