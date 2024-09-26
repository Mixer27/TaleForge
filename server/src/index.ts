import 'dotenv/config'
import mongoose from 'mongoose';
import express, { Express, Request, Response, Router } from "express";
import { pcsheetRoutes } from './routes/playerCharacterSheet';
import { skillRoutes } from './routes/skills';
import https from "https";
import fs from "fs";
import cors from "cors";
import path from 'path'
import { talentRoutes } from './routes/talents';
import { spellsRoutes } from './routes/spells';
import { itemsRoutes } from './routes/items';
import { authRoutes } from './routes/auth';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app: Express = express();

const { PORT, SSL_KEY, SSL_CERT, SESSION_SECRET, HOSTNAME } = process.env;

const mongoOptions = {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000
};

// Database connection
mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');
const dbUrl = "mongodb://localhost:27017/taleForge";
mongoose.connect(dbUrl, mongoOptions)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to database");
});

app.use(express.json());
app.use(cors({
    origin: ['https://194.59.140.170:9001', `${HOSTNAME}:9001` ,`${HOSTNAME}:80`, `${HOSTNAME}`, ''],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_SECRET || 'default_secret123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/taleForge',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    }),
}));


//  routes
app.use("/auth", authRoutes);
app.use("/pcsheets", pcsheetRoutes);
app.use("/skills", skillRoutes);
app.use("/talents", talentRoutes);
app.use("/spells", spellsRoutes);
app.use("/items", itemsRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("HELLO WORLD!!!");
})

https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, `${SSL_KEY}`)),
        cert: fs.readFileSync(path.join(__dirname ,`${SSL_CERT}`)),
    },
    app
)
    .listen(PORT, () => {
        console.log(`listen on port ${PORT}`);
        // console.log(mongoose.modelNames());
    });