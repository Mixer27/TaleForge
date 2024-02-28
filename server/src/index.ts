import 'dotenv/config'
import express, { Express, Request, Response } from "express";
import https from "https";
import fs from "fs";
import cors from "cors";

const app: Express = express();

const { PORT, SSL_KEY, SSL_CERT } = process.env;
// console.log(process.env);

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("HELLO WORLD!!!");
})

https.createServer(
    {
        key: fs.readFileSync(`${SSL_KEY}`),
        cert: fs.readFileSync(`${SSL_CERT}`),
    },
    app
)
    .listen(PORT, () => {
        console.log(`listen on port ${PORT}`);
    });