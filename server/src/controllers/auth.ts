import mongoose from "mongoose";
import { User } from "../models/user";
import { NextFunction, Request, Response } from "express";

const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();

        req.session.user_id = newUser._id;
        const userId = JSON.stringify({ user_id: newUser._id });
        res.cookie('session', userId, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).send(JSON.stringify({ message: username + " Registered", isLoggedIn: true, username: newUser.username }));
    } catch (err) {
        res.status(500).send("Error creating account")
    }
}

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        console.log("controller", username, password)
        const foundUser = await User.findAndValidate(username, password);
        console.log('found user', foundUser);
        if (foundUser) {
            // if (req.session.user_id || req.session.user_id === foundUser._id.toString()) {
            //     console.log("user already logged");
            //     res.status(409).send({ message: "User already logged in", isLoggedIn: true, username: foundUser?.username });
            //     return
            // }
            const userId = JSON.stringify({ user_id: foundUser._id });
            res.cookie('session', userId, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            req.session.user_id = foundUser._id.toString();
            res.status(200).send(JSON.stringify({ message: "Logged you in!", isLoggedIn: true, username: foundUser?.username }));
        } else {
            res.status(401).send(JSON.stringify({ message: "Wrong login or password!" }));
        }
    } catch (err) {
        console.error("error", err);
        res.status(500).send({ message: `Server error ${err}` });
    }
}

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    await req.session.destroy();
    res.clearCookie('session', {
        path: '/',
    });
    res.clearCookie('connect.sid', {
        path: '/',
    });
    res.send(JSON.stringify({ message: "Logged out", isLoggedIn: false }));
}

const getSession = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id);
        res.json({ isLoggedIn: true, username: user?.username, user_id: user?._id });
    } else {
        res.json({ isLoggedIn: false });
    }
};

const checkUserSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = req.sessionStore.get(req.sessionID, (err, session) => {
            if (err) {
                console.log(err)
                return res.status(500).send({ message: 'Error checking session' });
            }
            const userId = req.session.user_id;
            if (!session || !userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            User.findById(userId)
                .then((user) => {
                    if (!user) {
                        req.session.destroy();
                        return res.status(403).json({ message: 'Session invalid, user does not exist' });
                    }
                    next();
                }).catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: 'Server error' });
                });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export { postLogin, postLogout, postRegister, getSession, checkUserSession };