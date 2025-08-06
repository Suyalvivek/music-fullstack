import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_MUSIC_BASE_URL || "http://localhost:5000/api";
// axios.defaults.baseURL = API_BASE_URL;

export const addNewSong = (songData:unknown)=>{
    axios.defaults.headers['Authorization'] = localStorage.token;
     console.log('Register API',songData);
     return axios.post(API_BASE_URL+'add-song',songData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
     });//promise return karega
}
export const getAllSongs=()=>{
   axios.defaults.headers['Authorization'] = localStorage.token;
  return axios.get(API_BASE_URL+'all-songs');
}