import "./Sidebar.css";
import React, { useRef } from "react";
import SidebarOption from "../SidebarOption/SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { connect } from "react-redux";
import { SHOW__HOME } from "../../actions";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleHomeState = () => {
    this.props.dispatch({ type: SHOW__HOME });
  };

  render() {
    return (
      <div className="sidebar">
        {/* <img
          className="sidebar__logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
          alt="Anime Music"
        /> */}
        {/* <h3 className="sidebar__title">ANIME MUSIC</h3> */}
        <div className="sidebar__title__wrapper">
          <p className="sidebar__title">ANIME MUSIC</p>
        </div>
        <Link to="/" style={{ textDecoration: "none", marginTop: "20px" }}>
          <SidebarOption
            onClick={this.handleHomeState.bind(this)}
            title="Home"
            Icon={HomeIcon}
          />
        </Link>
        {/* <SidebarOption title="Search" Icon={SearchIcon} />
          <SidebarOption title="Your Library" Icon={LibraryMusicIcon} /> */}
        <br />
      </div>
    );
  }
}

// const Sidebar = ({ homeState, dispatch }) => {

//   );
// };

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Sidebar);

/* **** */

// const Sidebar = ({ homeState, dispatch }) => {
//   const handleHomeState = () => {
//     dispatch({ type: SHOW__HOME });
//   };

//   return (
//     <div className="sidebar">
//       <canvas></canvas>
//       <div className="sidebar__content">
//         {/* <img
//         className="sidebar__logo"
//         src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
//         alt="Anime Music"
//       /> */}
//         <h3 style={{ margin: "20px" }}>Anime Music</h3>
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <SidebarOption
//             onClick={handleHomeState}
//             title="Home"
//             Icon={HomeIcon}
//           />
//         </Link>
//         <SidebarOption title="Search" Icon={SearchIcon} />
//         <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
//         <br />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return state;
// };

// export default connect(mapStateToProps)(Sidebar);
