import React from "react";
import { Provider } from "react-redux";
import { store } from "../Player/Player";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";

const AnimePlayer = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          display: "flex",
          position: "relative",
        }}
      >
        <Sidebar />
        <Home />
      </div>
      <Footer />
    </Provider>
  );
};

export default AnimePlayer;
