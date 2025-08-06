import { PlaylistModel } from "../models/playlist-model.js";
import { SongModel } from "../models/song-model.js";
import logger from "../utils/logger.js";

// Create a new playlist
export const createPlaylist = async (playlistData) => {
  try {
    logger.info('Creating new playlist', { name: playlistData.name });
    const playlist = await PlaylistModel.create(playlistData);
    if (playlist && playlist._id) {
      return { success: true, message: "Playlist created successfully", playlist };
    }
    return { success: false, message: "Failed to create playlist" };
  } catch (error) {
    logger.error('Error creating playlist', { error: error.message });
    throw error;
  }
};

// Get all playlists for a user
export const getUserPlaylists = async (userId) => {
  try {
    logger.info('Fetching playlists for user', { userId });
    const playlists = await PlaylistModel.find({ userId, status: 'A' }).exec();
    return { success: true, playlists };
  } catch (error) {
    logger.error('Error fetching user playlists', { error: error.message, userId });
    throw error;
  }
};

// Add a song to a playlist
export const addSongToPlaylist = async (playlistId, songId) => {
  try {
    logger.info('Adding song to playlist', { playlistId, songId });
    
    // Check if song exists
    const song = await SongModel.findById(songId).exec();
    if (!song) {
      return { success: false, message: "Song not found" };
    }
    
    // Add song to playlist if not already added
    const playlist = await PlaylistModel.findById(playlistId).exec();
    if (!playlist) {
      return { success: false, message: "Playlist not found" };
    }
    
    // Check if song is already in playlist
    if (playlist.songs.includes(songId)) {
      return { success: false, message: "Song already in playlist" };
    }
    
    // Add song to playlist
    playlist.songs.push(songId);
    await playlist.save();
    
    return { success: true, message: "Song added to playlist", playlist };
  } catch (error) {
    logger.error('Error adding song to playlist', { error: error.message, playlistId, songId });
    throw error;
  }
};

// Remove a song from a playlist
export const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    logger.info('Removing song from playlist', { playlistId, songId });
    
    const playlist = await PlaylistModel.findById(playlistId).exec();
    if (!playlist) {
      return { success: false, message: "Playlist not found" };
    }
    
    // Remove song from playlist
    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();
    
    return { success: true, message: "Song removed from playlist", playlist };
  } catch (error) {
    logger.error('Error removing song from playlist', { error: error.message, playlistId, songId });
    throw error;
  }
};

// Get playlist details with populated songs
export const getPlaylistDetails = async (playlistId) => {
  try {
    logger.info('Fetching playlist details', { playlistId });
    
    const playlist = await PlaylistModel.findById(playlistId)
      .populate('songs')
      .exec();
      
    if (!playlist) {
      return { success: false, message: "Playlist not found" };
    }
    
    return { success: true, playlist };
  } catch (error) {
    logger.error('Error fetching playlist details', { error: error.message, playlistId });
    throw error;
  }
};

// Delete a playlist
export const deletePlaylist = async (playlistId, userId) => {
  try {
    logger.info('Deleting playlist', { playlistId, userId });
    
    // Find playlist and verify ownership
    const playlist = await PlaylistModel.findOne({ _id: playlistId, userId }).exec();
    if (!playlist) {
      return { success: false, message: "Playlist not found or you don't have permission" };
    }
    
    // Soft delete by updating status
    playlist.status = 'D'; // D for deleted
    await playlist.save();
    
    return { success: true, message: "Playlist deleted successfully" };
  } catch (error) {
    logger.error('Error deleting playlist', { error: error.message, playlistId, userId });
    throw error;
  }
};