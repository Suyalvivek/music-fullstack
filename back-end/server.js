import chalk from "chalk";
import express from "express";
import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/404.js";
import cors from "cors"
import { createConnection } from "./utils/db/connection.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/v1/', indexRoute);

app.use(Error404);
const promise = createConnection();
promise.then(()=>{
const server = app.listen(7777,(err)=>{
    console.log("DB connected");
    if(err){
        console.log(chalk.redBright.bold("Error in starting server", err));
    }else{
        console.log(chalk.greenBright.bold("Server up and running ",server.address().port));
    }
})
}).catch((err)=>{
    console.log(chalk.redBright.bold("Error in connecting to DB", err));
})
