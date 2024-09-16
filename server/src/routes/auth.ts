import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getItems } from "../controllers/items";
import { postLogin, postLogout, postRegister } from "../controllers/auth";

const router = Router()

router.route("/login")
    .post(catchAsync(postLogin))

router.route("/logout")
    .post(postLogout)

router.route("/register")
    .post(catchAsync(postRegister))

export { router as authRoutes };