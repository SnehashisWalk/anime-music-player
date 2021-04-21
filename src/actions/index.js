import { ROUTE__HANDLE, SET__AUDIO__REF, SET__PLAYER__ROUTE } from "./types";

export const PLAY = () => {
  return {
    type: "PLAY",
  };
};

export const PAUSE = () => {
  return {
    type: "PAUSE",
  };
};

export const PLAY__SHUFFLE = () => {
  return {
    type: "PLAY__SHUFFLE",
  };
};

export const PLAY__REPEAT__ONE = () => {
  return {
    type: "PLAY__REPEAT__ONE",
  };
};

export const MUTE__AUDIO = () => {
  return {
    type: "MUTE__AUDIO",
  };
};

export const SHOW__HOME = () => {
  return {
    type: "SHOW__HOME",
  };
};

export const handleRoute = (path = "home") => {
  return {
    type: ROUTE__HANDLE,
    payload: path,
  };
};

export const setPlayerRoute = (trackInfo) => {
  return {
    type: SET__PLAYER__ROUTE,
    payload: trackInfo,
  };
};

export const setAudioRef = (audioRef) => {
  return {
    type: SET__AUDIO__REF,
    payload: audioRef,
  };
};

export const OPEN__PLAYER = () => {
  return {
    type: OPEN__PLAYER,
  };
};

export const OPEN__VISUALIZER = () => {
  return {
    type: OPEN__VISUALIZER,
  };
};
