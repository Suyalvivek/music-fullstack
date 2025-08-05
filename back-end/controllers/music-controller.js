import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { addNewSong } from "../services/song-service.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getAllSongs = (req, res) => {
  res.json({ message: "Get All Songs" });
};

export const searchSongs = (req, res) => {
  res.json({ message: "Search Songs" });
};

export const addSong = async (req, res) => {
  console.log(req.files);
  console.log("Add Song", req.files);
  const audioFile = req.files["audio[]"] || req.files.audio;
  try {
    if (!audioFile) {
      return res.status(400).json({ message: "Audio File Not Found" });
    }
    const fileName = req.body.title + ".mp3";
    const fileData = audioFile.data;
    const uploadPath = path.join(__dirname, "../upload", fileName);
    fs.writeFileSync(uploadPath, fileData);
    const result = await addNewSong(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error During Song,Server Error" });
    console.log(error);
  }
};
export const updateSong = (req, res) => {
  res.json({ message: "Update Song" });
};
