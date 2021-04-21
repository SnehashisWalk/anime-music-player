import React from "react";
import "./SidebarOption.css";

export default function SidebarOptions({ onClick, title, Icon }) {
  return (
    <div className="sidebarOption" style={{ margin: "auto" }}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4 onClick={onClick}>{title}</h4> : <p>{title}</p>}
    </div>
  );
}
