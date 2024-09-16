import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getItems } from "../controllers/items";
import { postLogin } from "../controllers/auth";

const router = Router()

router.route("/login")
    .post(catchAsync(postLogin))
    .get(catchAsync(getItems));


export { router as authRoutes };