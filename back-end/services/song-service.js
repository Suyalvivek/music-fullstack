import { SongModel } from "../models/song-model.js";
import logger from "../utils/logger.js";

export const addNewSong = async (songObject) => {
  try {
    songObject.audiourl= process.env.AUDIO_URL_BASE+songObject.title+'.mp3';
    const doc = await SongModel.create(songObject);
    if (doc && doc._id) {
      return {message:"Song Register"};
    }
  } catch (error) {
    throw error;
  }
};
export const getAllSongs = async () => {
  try {
    const docs = await SongModel.find().exec();
    
    logger.debug('Retrieved songs from database', { count: docs.length });
    if (docs) {
      return {songs: docs};
    } else {
      return null;
    }
  } catch (error) {
    logger.error('Database error while fetching songs', { error: error.message });
    throw new Error("Error During Song");
  }
};