import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slices/songsSlice";

const store = configureStore({ reducer: { songs: songsReducer } });
export default store;