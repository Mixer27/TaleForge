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
    console.log("controller", username, password)
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        const userId = JSON.stringify({user_id: foundUser._id});
        res.cookie('session', userId, {
            httpOnly: true,      // Zapewnia, że ciasteczko nie jest dostępne w JavaScript
            secure: true, // Ustaw na true, jeśli używasz HTTPS
            // sameSite: 'strict',  // Chroni przed atakami CSRF
            maxAge: 1000 * 60 * 60 * 24,  // Ustaw ciasteczko na 24 godziny
        });
        req.session.user_id = foundUser._id.toString();
        // res.redirect('/secret');
        res.send(JSON.stringify({message: "Logged you in!"}));
    } else {
        // res.redirect('/login');
        res.send(JSON.stringify({message: "Wrong login or password!"}));
    }
    // res.send(req.body)
}

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    await req.session.destroy();
    res.send(JSON.stringify({message: "Logged out"}));
}

const getSession = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        res.json({ isLoggedIn: true, username: user?.username, user_id: user?._id });
    } else {
        res.json({ isLoggedIn: false });
    }
};

export { postLogin, postLogout, postRegister, getSession };