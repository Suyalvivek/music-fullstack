import chalk from "chalk";
import express from "express";
import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/404.js";
import cors from "cors"
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/', indexRoute);

app.use(Error404);

const server = app.listen(7777,(err)=>{
    if(err){
        console.log(chalk.redBright.bold("Error in starting server", err));
    }else{
        console.log(chalk.greenBright.bold("Server up and running ",server.address().port));
    }
})