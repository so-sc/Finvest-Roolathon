
import express from 'express';
import fs from 'fs';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongo from 'mongoose';
import { App } from "./routes/app_api";
require('dotenv').config();


const app = express();

mongo.Promise = Promise;
mongo.connect(process.env.MONGODB)
const db = mongo.connection
db.on('error', (error: Error) => console.log("Check your mongodb please. There is an issue with mongodb."))
db.on('open', () => console.log("Mongodb is connected."))
app.use(express.json())

app.use(cors({
    origin: '*', // ['http://localhost:3000', 'http://localhost:7000',], // process.env.DOMAIN,
    optionsSuccessStatus: 200,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'],
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*',); // ['http://localhost:3000', 'http://localhost:7000',]); //process.env.DOMAIN);
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers'); 
    next();
});
app.set('trust proxy', true);
app.use(bodyParser.json());

var server = http.createServer(app);

app.get("/", async(req, res) => {
    return res.status(200).json({success: true})
})

// User Interface API routes
app.use("/api/app", App)


server.listen(7000, () => console.log(`Server running at http://localhost:7000`));