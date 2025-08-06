import { create } from "zustand";
import { getAllSongs } from "../api/music-api.ts";
type Song={
    _id: string,
    title:string,
    desc:string,
    image:string,
    audiourl:string,
    status?: string
}
type SongStore={
    songs:Song[];
    loadSong:()=>void;//backend all songs store
    // getAll:()=>Song[];//give all songs to component
}
export const useMusic=create<SongStore>()((set)=>({
    songs:[],
    loadSong:async()=>{
        try {
            const response = await getAllSongs();
            if (response.data && response.data.songs) {
                set({songs:response.data.songs}); //set the songs in the store
            } else {
                console.error('Invalid response format:', response);
                set({songs:[]});
            }
        } catch (error) {
            console.error('Error loading songs:', error);
            set({songs:[]});
        }
    }
}))