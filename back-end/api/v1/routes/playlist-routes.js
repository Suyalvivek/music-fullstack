import express from "express";
import { createNewPlaylist, getMyPlaylists, addToPlaylist, removeFromPlaylist, getPlaylist, deleteUserPlaylist } from "../../../controllers/playlist-controller.js";
import { auth } from "../../../utils/middlewares/auth.js";
import { musicLimiter } from "../../../utils/middlewares/rate-limiter.js";

const router = express.Router();

// All playlist routes require authentication
router.use(auth);

// Create a new playlist
router.post("/create", musicLimiter, createNewPlaylist);

// Get all playlists for the logged-in user
router.get("/my-playlists", musicLimiter, getMyPlaylists);

// Add a song to a playlist
router.post("/add-song", musicLimiter, addToPlaylist);

// Remove a song from a playlist
router.post("/remove-song", musicLimiter, removeFromPlaylist);

// Get playlist details with songs
router.get("/details/:playlistId", musicLimiter, getPlaylist);

// Delete a playlist
router.delete("/delete/:playlistId", musicLimiter, deleteUserPlaylist);

export default router;