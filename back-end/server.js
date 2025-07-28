import chalk from "chalk";
import express from "express";
import userRoutes from "./api/v1/routes/user-routes.js";
import musicRoutes from "./api/v1/routes/music-routes.js";
import { indexRoute } from "./api/v1/routes/index.js";
const app = express();
// app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/music', musicRoutes);
app.use('/api/v1/', indexRoute);
app.use((req,res,next)=>{
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
})
// app.get("/", (req, res) => {
//     res.send("Hello World");
// })
const server = app.listen(7777,(err)=>{
    if(err){
        console.log(chalk.redBright.bold("Error in starting server", err));
    }else{
        console.log(chalk.greenBright.bold("Server up and running ",server.address().port));
    }
})