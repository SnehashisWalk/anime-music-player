import Sidebar from "../Sidebar/Sidebar";
import "./Player.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../reducers";
import HomeBody from "../Home/components/HomeBody";
import Nav from "../Home/components/Nav";
import Visualization from "../Footer/Visualization";

const initialStore = {
  homeState: false,
  routeTo: "home",
  openPlayer: false,
  openVisualizer: false,
  currentTrack: {
    _id: 0,
    name: "",
    path: "",
    image: "",
    singer: "",
    album: "",
    duration: "",
    isPlaying: false,
    shuffle: false,
    repeatOne: false,
    muteAudio: false,
  },
};

export const store = createStore(
  reducer,
  initialStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Player = () => {
  return (
    <Provider store={store}>
      {/* <Visualization /> */}
      <div className="player">
        {/* <div className="player__body"> */}
        <Sidebar />
        <div style={{ flex: 0.9 }}>
          <Nav />
          <HomeBody />
        </div>
        {/* </div> */}
      </div>
    </Provider>
  );
};

export default Player;
