import { createSlice } from "@reduxjs/toolkit";
import { songsData } from "../data/songsData"; // Importing songs data

const initialState = {
  songs: songsData,
  currentSongId: 2,
};

// We can create three files also in slices folder
// songsActions.js → Defines action creators.
// songsReducer.js → Contains the reducer logic.
// songsSlice.js → Exports both for cleaner usage.

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSongId = action.payload;
    },
    playNextSong: (state) => {
      const currentIndex = state.songs.allIds.indexOf(state.currentSongId);
      const nextIndex = (currentIndex + 1) % state.songs.allIds.length;
      state.currentSongId = state.songs.allIds[nextIndex];
    },
    playPrevSong: (state) => {
      const currentIndex = state.songs.allIds.indexOf(state.currentSongId);
      const prevIndex =
        (currentIndex - 1 + state.songs.allIds.length) % state.songs.allIds.length;
      state.currentSongId = state.songs.allIds[prevIndex];
    },
  },
});

export const { setCurrentSong, playNextSong, playPrevSong } = songsSlice.actions;
export default songsSlice.reducer;
