import 'dotenv/config'
import mongoose from 'mongoose';
import express, { Express, Request, Response, Router } from "express";
import { pcsheetRoutes } from './routes/playerCharacterSheet';
import https from "https";
import fs from "fs";
import cors from "cors";
import path from 'path'

const app: Express = express();

const { PORT, SSL_KEY, SSL_CERT } = process.env;
// console.log(process.env);

// Database connection
const dbUrl = "mongodb://localhost:27017/taleForge";
mongoose.connect(dbUrl, {})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to database");
});

app.use(express.json());
app.use(cors());


//  routes
app.use("/pcsheets", pcsheetRoutes);

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