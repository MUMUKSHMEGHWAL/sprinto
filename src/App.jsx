import React from "react";
import { Provider } from "react-redux";
import store from "./store/default";
import LikedSongs from "./components/layout/likedSongs/likedSongs";
import './app.css'

const App = () => {
  return (
    <Provider store={store}>
      <LikedSongs/>
    </Provider>
  );
};

export default App
