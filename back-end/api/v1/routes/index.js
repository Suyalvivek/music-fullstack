import express from "express";
import userRoutes from "./user-routes.js";
import musicRoutes from "./music-routes.js";
import { auth } from "../../../utils/middlewares/auth.js";
const app = express();
export const indexRoute = express.Router();
indexRoute.use("/user", userRoutes);
indexRoute.use("/music",auth, musicRoutes);