import mongoose from "mongoose";
import { User } from "../models/user";
import { NextFunction, Request, Response } from "express";

const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    req.session.user_id = newUser._id;
    res.send(username + " Registered")
}

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    // console.log("controller", username, password)
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        // res.redirect('/secret');
        res.send("Logged you in!");
    } else {
        // res.redirect('/login');
        res.send("Wrong login or password!");
    }
    // res.send(req.body)
}

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    await req.session.destroy();
    res.send("Logged out");
}

const getSession = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        res.json({ isLoggedIn: true, username: user?.username });
    } else {
        res.json({ isLoggedIn: false });
    }
};

export { postLogin, postLogout, postRegister, getSession };