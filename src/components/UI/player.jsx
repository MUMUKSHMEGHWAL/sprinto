import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { setCurrentSong } from "../../store/slices/songsSlice";

const Player = () => {
  const dispatch = useDispatch();
  const { songs, currentSongId } = useSelector((state) => state.songs);
  const currentSong = currentSongId ? songs.byId[currentSongId] : null;
  
  // Memoize songIds to avoid unnecessary recalculations
  const songIds = useMemo(() => Object.keys(songs.byId), [songs]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1)); // Simulated progress
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Memoized functions to avoid re-creating them on every render
  const playNextSong = useCallback(() => {
    if (!currentSongId) return;
    const currentIndex = songIds.indexOf(currentSongId.toString());
    const nextIndex = (currentIndex + 1) % songIds.length;
    dispatch(setCurrentSong(songIds[nextIndex]));
  }, [currentSongId, songIds, dispatch]);

  const playPreviousSong = useCallback(() => {
    if (!currentSongId) return;
    const currentIndex = songIds.indexOf(currentSongId.toString());
    const prevIndex = (currentIndex - 1 + songIds.length) % songIds.length;
    dispatch(setCurrentSong(songIds[prevIndex]));
  }, [currentSongId, songIds, dispatch]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex items-center">
      {currentSong ? (
        <div className="w-full">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-700 mt-2 relative">
            <div className="h-1 bg-[#fff]" style={{ width: `${progress}%` }}></div>
            <div className="w-3 h-3 bg-white rounded-full absolute -top-1.5" style={{ left: `${progress}%` }}></div>
          </div>

          <div className="flex items-center w-full pr-4">
            {/* Album Cover */}
            <img src={currentSong.cover} alt={currentSong.title} className="w-16 h-16 rounded" />

            {/* Song Details */}
            <div className="ml-4 flex-1">
              <h3 className="text-sm main-text-color">{currentSong.title}</h3>
              <p className="text-gray-400 text-xs sub-title-color">{currentSong.artist}</p>
            </div>

            {/* Player Controls */}
            <div className="flex items-center space-x-4 pr-4">
              <FaStepBackward className="cursor-pointer text-xl" onClick={playPreviousSong} />
              {isPlaying ? (
                <FaPause className="cursor-pointer text-2xl" onClick={() => setIsPlaying(false)} />
              ) : (
                <FaPlay className="cursor-pointer text-2xl" onClick={() => setIsPlaying(true)} />
              )}
              <FaStepForward className="cursor-pointer text-xl" onClick={playNextSong} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 p-4">Select a song to play</p>
      )}
    </div>
  );
};

export default Player;
