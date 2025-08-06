import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { addNewSong,getAllSongs as allSongs } from "../services/song-service.js";
import logger from "../utils/logger.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getAllSongs = async (req, res) => {
  try {
    logger.info('Fetching all songs');
    const songs = await allSongs();
    logger.debug('Songs fetched successfully', { count: songs.songs ? songs.songs.length : 0 });
    res.status(200).json(songs);
  } catch (error) {
    logger.error('Error fetching songs', { error: error.message });
    res.status(500).json({ message: "Error During Song,Server Error" });
  }
}
  
export const searchSongs = (req, res) => {
  logger.debug('Search songs endpoint accessed', { query: req.query });
  res.json({ message: "Search Songs" });
};

export const addSong = async (req, res) => {
  const audioFile = req.files["audio[]"] || req.files.audio;
  try {
    logger.info('Adding new song', { title: req.body.title });
    
    if (!audioFile) {
      logger.warn('Audio file not found in request');
      return res.status(400).json({ message: "Audio File Not Found" });
    }
    
    const fileName = req.body.title + ".mp3";
    const fileData = audioFile.data;
    const uploadPath = path.join(__dirname, "../upload", fileName);
    
    logger.debug('Writing audio file', { path: uploadPath, size: fileData.length });
    fs.writeFileSync(uploadPath, fileData);
    
    const result = await addNewSong(req.body);
    logger.info('Song added successfully', { title: req.body.title });
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error adding song', { error: error.message, title: req.body?.title });
    res.status(500).json({ message: "Error During Song,Server Error" });
  }
};
export const updateSong = (req, res) => {
  logger.debug('Update song endpoint accessed', { songId: req.params.id });
  res.json({ message: "Update Song" });
};
