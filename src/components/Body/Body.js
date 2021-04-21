import React, { useState, useEffect } from "react";
import "./Body.css";
import Header from "../Header/Header";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../SongRow/SongRow";
import { SONG_LIB } from "../helper/SONG_LIB";
import { connect } from "react-redux";
import { SET__PLAYER__ROUTE } from "../../actions/types";
import { Button, Grid } from "@material-ui/core";
import Nav from "../Home/components/Nav";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { FaPlayCircle, FaPlay } from "react-icons/fa";

const Body = ({ track, path, dispatch }) => {
  console.log(track);

  return (
    <>
      <div
        className="body"
        style={{
          background: `linear-gradient(180deg, ${track.primaryBackgroundTint}, ${track.secondaryBackgroundTint}`,
        }}
      >
        <Nav />
        <div
          className="body__info"
          style={{
            background: `linear-gradient(180deg, ${track.primaryBackgroundTint}, ${track.secondaryBackgroundTint}`,
          }}
        >
          <img style={{ margin: "20px" }} src={track.image} alt="Track Image" />
          <div className="body__infoText">
            <strong style={{ letterSpacing: "3px" }}>SINGLE</strong>
            <h2 style={{ letterSpacing: "3px" }}>{track.album}</h2>
            <p style={{ letterSpacing: "3px" }}>Singer: {track.singer}</p>
          </div>
        </div>
      </div>
      <div className="body__icons">
        <Button
          className="play__btn"
          style={{
            height: "62px",
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#1db954",
            marginRight: "25px",
          }}
        >
          <FaPlay style={{ fontSize: "36px" }} />
        </Button>
        {/* <FaPlayCircle className="body__shuffle" /> */}
        <FavoriteBorderIcon
          fontSize="large"
          style={{ cursor: "pointer", color: "white" }}
        />
      </div>
      <Grid
        container
        style={{
          padding: "0 25px",
          color: "#b3b3b3",
          fontSize: "14px",
          letterSpacing: "3px",
        }}
        alignItems="center"
      >
        <Grid item lg={1} md={1} sm={1} xs={1}>
          #
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          TITLE
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          ALBUM
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          ARTIST
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <AccessTimeIcon style={{ fontSize: "20px" }} />
        </Grid>
      </Grid>
      <hr
        style={{
          margin: "10px 20px 15px 20px",
          // marginBottom: "15px",
          backgroundColor: "#b3b3b3",
        }}
      />
      <div className="body__songs">
        <SongRow />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.currentTrack,
    routeTo: state.routeTo,
    path: ownProps.path,
  };
};

export default connect(mapStateToProps)(Body);
