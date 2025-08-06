import express from "express";
import { addSong, getAllSongs, searchSongs, updateSong } from "../../../controllers/music-controller.js";
import { musicLimiter } from "../../../utils/middlewares/rate-limiter.js";
const router = express.Router();
router.get("/all-songs", musicLimiter, getAllSongs);
router.get("/search-songs", musicLimiter, searchSongs);
router.post("/add-song", musicLimiter, addSong);
router.post("/update-song", musicLimiter, updateSong);
export default router;
