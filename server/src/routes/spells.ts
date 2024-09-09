import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getSpells } from "../controllers/spells"

const router = Router()

router.route("/")
    .get(catchAsync(getSpells));

export { router as spellsRoutes }