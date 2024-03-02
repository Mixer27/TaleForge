import { Router, Express } from "express";
import { PlayerCharacterSheet } from "../models/playerCharacterSheet";
import { catchAsync } from "../utils/catchAsync";
import { getPlayerCharacterSheet } from "../controllers/playerCharacterSheet";


const router = Router()

router.route("/")
    .get(catchAsync(getPlayerCharacterSheet));

export { router as pcsheetRoutes }