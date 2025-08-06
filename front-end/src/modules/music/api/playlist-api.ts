import axios from "axios";
const PLAYLIST_API = import.meta.env.VITE_API_PLAYLIST_BASE_URL;

// Set auth token for all requests
const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers['Authorization'] = token;
  }
};

// Create a new playlist
export const createPlaylist = (name: string) => {
  setAuthHeader();
  return axios.post(PLAYLIST_API + "create", { name });
};

// Get all playlists for the logged-in user
export const getMyPlaylists = () => {
  setAuthHeader();
  return axios.get(PLAYLIST_API + "my-playlists");
};

// Add a song to a playlist
export const addSongToPlaylist = (playlistId: string, songId: string) => {
  setAuthHeader();
  return axios.post(PLAYLIST_API + "add-song", { playlistId, songId });
};

// Remove a song from a playlist
export const removeSongFromPlaylist = (playlistId: string, songId: string) => {
  setAuthHeader();
  return axios.post(PLAYLIST_API + "remove-song", { playlistId, songId });
};

// Get playlist details with songs
export const getPlaylistDetails = (playlistId: string) => {
  setAuthHeader();
  return axios.get(PLAYLIST_API + `details/${playlistId}`);
};

// Delete a playlist
export const deletePlaylist = (playlistId: string) => {
  setAuthHeader();
  return axios.delete(PLAYLIST_API + `delete/${playlistId}`);
};