import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getSkills } from "../controllers/skills";

const router = Router()

router.route("/")
    .get(catchAsync(getSkills));

export { router as skillRoutes }