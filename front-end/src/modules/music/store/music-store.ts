import { create } from "zustand";
import { getAllSongs } from "../api/music-api.ts";
type Song={
    title:string,
    desc:string,
    image:string,
    audio:string
}
type SongStore={
    songs:Song[];
    loadSong:()=>void;//backend all songs store
    // getAll:()=>Song[];//give all songs to component
}
export const useMusic=create<SongStore>()((set)=>({
    songs:[],
    loadSong:async()=>{
        const response = await getAllSongs()
        console.log(response);
        set((state)=>({songs:response.data.songs})); //set the songs in the store
    }
}))