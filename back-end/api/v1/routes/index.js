import express from "express";
import userRoutes from "./user-routes.js";
import musicRoutes from "./music-routes.js";
import playlistRoutes from "./playlist-routes.js";
import { auth } from "../../../utils/middlewares/auth.js";
import { authLimiter, musicLimiter } from "../../../utils/middlewares/rate-limiter.js";
const app = express();
export const indexRoute = express.Router();
// Apply auth limiter to user routes
indexRoute.use("/user", userRoutes);
// Apply music limiter and auth middleware to music routes
indexRoute.use("/music", auth, musicRoutes);
// Apply playlist routes
indexRoute.use("/playlist", playlistRoutes);