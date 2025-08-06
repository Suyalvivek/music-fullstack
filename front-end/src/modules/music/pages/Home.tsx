import React, { useEffect } from 'react'
import { useMusic } from '../store/music-store'
import Song from '@/modules/components/Song';

const Home = () => {
    const {songs,loadSong}=useMusic();

    useEffect(()=>{
        loadSong();
        console.log("mounting home page");
    },[])
  return (
    <div>
      <h1> Music loads here </h1>
     {songs && songs.length}
     {songs.map(song=><Song song={song}/>)}
      </div>
  )
}

export default Home;