import { createPlaylist, getUserPlaylists, addSongToPlaylist, removeSongFromPlaylist, getPlaylistDetails, deletePlaylist } from "../services/playlist-service.js";
import logger from "../utils/logger.js";

// Create a new playlist
export const createNewPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    if (!name) {
      return res.status(400).json({ success: false, message: "Playlist name is required" });
    }
    
    const playlistData = { name, userId };
    const result = await createPlaylist(playlistData);
    
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    logger.error('Error in createNewPlaylist controller', { error: error.message });
    return res.status(500).json({ success: false, message: "Server error while creating playlist" });
  }
};

// Get all playlists for the logged-in user
export const getMyPlaylists = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    const result = await getUserPlaylists(userId);
    return res.status(200).json(result);
  } catch (error) {
    logger.error('Error in getMyPlaylists controller', { error: error.message });
    return res.status(500).json({ success: false, message: "Server error while fetching playlists" });
  }
};

// Add a song to a playlist
export const addToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    if (!playlistId || !songId) {
      return res.status(400).json({ success: false, message: "Playlist ID and Song ID are required" });
    }
    
    const result = await addSongToPlaylist(playlistId, songId);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    logger.error('Error in addToPlaylist controller', { error: error.message });
    return res.status(500).json({ success: false, message: "Server error while adding song to playlist" });
  }
};

// Remove a song from a playlist
export const removeFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    if (!playlistId || !songId) {
      return res.status(400).json({ success: false, message: "Playlist ID and Song ID are required" });
    }
    
    const result = await removeSongFromPlaylist(playlistId, songId);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    logger.error('Error in removeFromPlaylist controller', { error: error.message });
    return res.status(500).json({ success: false, message: "Server error while removing song from playlist" });
  }
};

// Get playlist details with songs
export const getPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    
    if (!playlistId) {
      return res.status(400).json({ success: false, message: "Playlist ID is required" });
    }
    
    const result = await getPlaylistDetails(playlistId);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    logger.error('Error in getPlaylist controller', { error: error.message });
    return res.status(500).json({ success: false, message: "Server error while fetching playlist details" });
  }
};

// Delete a playlist
export const deleteUserPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    if (!playlistId) {
      return res.status(400).json({ success: false, message: "Playlist ID is required" });
    }
    
    const result = await deletePlaylist(playlistId, userId);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    logger.error('Error in deleteUserPlaylist controller', { error: error.message });
    return res.status(500).json({ success: false, message: "Server error while deleting playlist" });
  }
};