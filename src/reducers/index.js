import {
  PLAY,
  PAUSE,
  PLAY__SHUFFLE,
  PLAY__REPEAT__ONE,
  MUTE__AUDIO,
  SHOW__HOME,
  OPEN__PLAYER,
  OPEN__VISUALIZER,
} from "../actions";

import {
  ROUTE__HANDLE,
  SET__PLAYER__ROUTE,
  SET__AUDIO__REF,
} from "../actions/types";

function reducer(state, action) {
  if (action.type === PLAY) {
    console.log("play");
    return {
      currentTrack: {
        ...state.currentTrack,
        isPlaying: true,
      },
    };
  }
  if (action.type === PAUSE) {
    return {
      currentTrack: {
        ...state.currentTrack,
        isPlaying: false,
      },
    };
  }
  if (action.type === PLAY__SHUFFLE) {
    return {
      currentTrack: {
        ...state.currentTrack,
        shuffle: !state.currentTrack.shuffle,
      },
    };
  }
  if (action.type === PLAY__REPEAT__ONE) {
    return {
      currentTrack: {
        ...state.currentTrack,
        repeatOne: !state.currentTrack.repeatOne,
      },
    };
  }
  if (action.type === MUTE__AUDIO) {
    return {
      currentTrack: {
        ...state.currentTrack,
        muteAudio: !state.currentTrack.muteAudio,
      },
    };
  }
  if (action.type === SHOW__HOME) {
    return {
      ...state,
      homeState: !state.homeState,
    };
  }
  if (action.type === ROUTE__HANDLE) {
    return {
      ...state,
      routeTo: action.payload,
    };
  }
  if (action.type === OPEN__PLAYER) {
    return {
      ...state,
      openPlayer: true,
    };
  }
  if (action.type === SET__PLAYER__ROUTE) {
    return {
      ...state,
      currentTrack: {
        _id: action.payload._id,
        name: action.payload.name,
        path: action.payload.path,
        image: action.payload.image,
        singer: action.payload.singer,
        album: action.payload.album,
        duration: action.payload.duration,
        primaryBackgroundTint: action.payload.primaryBackgroundTint,
        secondaryBackgroundTint: action.payload.secondaryBackgroundTint,
        isPlaying: false,
        shuffle: false,
        repeatOne: false,
        muteAudio: false,
      },
    };
  }
  // if (action.type === SET__AUDIO__REF) {
  //   return {
  //     ...state,
  //     audioRef: action.payload,
  //   };
  // }

  if (action.type === OPEN__VISUALIZER) {
    return {
      ...state,
      openVisualizer: !state.openVisualizer,
    };
  }

  return state;
}

export default reducer;
