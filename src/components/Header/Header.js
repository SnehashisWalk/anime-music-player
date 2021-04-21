import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";

export default function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs or podcasts"
          type="search"
        />
      </div>
      <div className="header__right">
        <Avatar src="" alt="Walk" />
        <h4>Walk</h4>
      </div>
    </div>
  );
}
