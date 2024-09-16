import { Router, Express } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getItems } from "../controllers/items";
import { getSession, postLogin, postLogout, postRegister } from "../controllers/auth";

const router = Router()

router.route("/login")
    .post(catchAsync(postLogin))

router.route("/logout")
    .post(catchAsync(postLogout))

router.route("/register")
    .post(catchAsync(postRegister))

router.route("/session")
    .get(getSession)

export { router as authRoutes };