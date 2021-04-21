import React from "react";
import "./Home.css";
import HomeBody from "./components/HomeBody";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
import { SONG_LIB } from "../helper/SONG_LIB";
import { SET__PLAYER__ROUTE } from "../../actions/types";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Body from "../Body/Body";

const Home = ({ routeTo, dispatch }) => {
  useEffect(() => {
    SONG_LIB.map((song, index) => {
      if (song.name === routeTo) {
        dispatch({
          type: SET__PLAYER__ROUTE,
          payload: song,
        });
      }
      return true;
    });
  }, [routeTo]);

  return (
    <div className="home">
      {/* <Nav /> */}
      <Body path={routeTo} />
      {/* {routeTo === "home" ? (
        <HomeBody />
      ) : (
        <>
          
        </>
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Home);
