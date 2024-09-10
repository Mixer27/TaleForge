import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getItems, getArmorItems, getWeaponItems } from "../controllers/items";

const router = Router()

router.route("/")
    .get(catchAsync(getItems));

router.route("/armors")
    .get(catchAsync(getArmorItems));

router.route("/weapons")
    .get(catchAsync(getWeaponItems));

export { router as itemsRoutes }