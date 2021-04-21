import "./SongRow.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import { OPEN__PLAYER, PAUSE, PLAY } from "../../actions";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const SongRow = ({ currentTrack, dispatch }) => {
  return (
    <>
      {/* <div>
        {currentTrack.isPlaying ? (
          <StopIcon
            onClick={() => dispatch({ type: PAUSE })}
            className="stop-icon"
          />
        ) : (
          <PlayArrowIcon
            onClick={() => dispatch({ type: PLAY })}
            className="play-icon"
          />
        )}
      </div> */}
      <Grid
        onClick={() => {
          dispatch({ type: OPEN__PLAYER });
        }}
        container
        alignItems="center"
        className="songRow"
        style={{ letterSpacing: "2px" }}
      >
        <Grid item lg={1} md={1} sm={1} xs={1}>
          1
        </Grid>
        <Grid container item lg={3} md={3} sm={3} xs={3}>
          <img src={currentTrack.image} alt="" className="songRow__album" />
          <div className="songRow__info">
            <h1>{currentTrack.name}</h1>
            {/* <p>{currentTrack.singer}</p> */}
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <p>{currentTrack.album}</p>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <p>{currentTrack.singer}</p>
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <p>{currentTrack.duration}</p>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SongRow);
