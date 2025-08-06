import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_MUSIC_BASE_URL;

export const addNewSong = (songData:unknown)=>{
    axios.defaults.headers['Authorization'] = localStorage.token;
    return axios.post(API_BASE_URL+'add-song',songData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const getAllSongs=()=>{
    try {
        axios.defaults.headers['Authorization'] = localStorage.token;
        return axios.get(API_BASE_URL+'all-songs');
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
}