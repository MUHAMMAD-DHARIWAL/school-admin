import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ComputerIcon from '@mui/icons-material/Computer';
import ScienceIcon from '@mui/icons-material/Science';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


import { DarkModeContext } from "../../Context/DarkModeContext";
import { useContext } from "react";

const SideBar = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: darkModeDispatch } = useContext(DarkModeContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // call the logout function from the context
  };
  return (
    <div className="sidebar">
      
      <div className="top">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            </li>
            </Link>
          <p className="title">LISTS</p>
          <Link to="/student" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          
          <p className="title">DEPARTMENTS</p>
          <Link to="/arts" style={{ textDecoration: "none" }}>
            <li>
              <SportsMartialArtsIcon className="icon" />
              <span>Arts</span>
            </li>
            </Link>
            <Link to="/computer" style={{ textDecoration: "none" }}>
            <li>
              <ComputerIcon className="icon" />
              <span>Computer</span>
            </li>
            </Link>
            <Link to="/science" style={{ textDecoration: "none" }}>
            <li>
              <ScienceIcon className="icon" />
              <span>Science</span>
            </li>
          </Link>
          <p className="title">SUPER USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
           <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default SideBar;