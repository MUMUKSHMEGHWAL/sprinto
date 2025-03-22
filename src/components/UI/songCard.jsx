import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../../store/slices/songsSlice";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();

  // Memoize the click handler
  const handleClick = useCallback(() => {
    dispatch(setCurrentSong(song.id));
  }, [dispatch, song.id]);

  return (
    <div className="p-2 cursor-pointer" onClick={handleClick}>
      <img src={song.cover} alt={song.title} className="w-40 h-40 rounded" />
      <div className="text-center">
        <h3 className="text-white mt-2 text-sm main-text-color">{song.title}</h3>
        <p className="text-gray-400 text-xs sub-title-color">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
