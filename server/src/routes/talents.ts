import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getTalents} from "../controllers/talents"

const router = Router()

router.route("/")
    .get(catchAsync(getTalents));

export { router as talentRoutes }