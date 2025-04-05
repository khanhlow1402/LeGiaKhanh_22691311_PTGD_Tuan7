import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Menu.css";
import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.png";
import prj from "../assets/Folder.png";
import team from "../assets/groups.png";
import mess from "../assets/chat.png";
import ana from "../assets/Pie chart.png";
import code from "../assets/Code.png";

const Menu = () => {
  return (
    <div className="left">
      <div className="logo-container">
        <img src={logo} alt="" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <img src={dashboard} alt="" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <img src={prj} alt="" />
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <img src={team} alt="" />
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <img src={ana} alt="" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {" "}
              <img src={mess} alt="" />
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/integrations"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <img src={code} alt="" />
              Integrations
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
