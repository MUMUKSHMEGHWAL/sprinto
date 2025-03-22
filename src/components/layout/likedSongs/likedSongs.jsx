import React from "react";
import SongList from "../../UI/songList"
import Player from "../..//UI/player";
import Nav from "../../UI/nav";


const LikedSongs = () => {
  return (
    <div className="bg-color pb-16 min-h-screen text-white">
      <Nav/>
      <h1 className="text-2xl m-4 main-text-color">Liked Songs</h1>
      <SongList />
      <Player />
    </div>
  );
};

export default LikedSongs
