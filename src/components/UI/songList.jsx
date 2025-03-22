import React from "react";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";

const SongList = () => {
  // Select only the necessary state properties
  const allIds = useSelector((state) => state.songs.songs.allIds);
  const byId = useSelector((state) => state.songs.songs.byId);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 place-items-center">
      {allIds.map((id) => (
        <SongCard key={id} song={byId[id]} />
      ))}
    </div>
  );
};

export default SongList;
