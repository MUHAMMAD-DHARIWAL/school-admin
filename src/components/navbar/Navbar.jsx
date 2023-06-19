import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { DarkModeContext } from "../../Context/DarkModeContext"
import Logo from "../../assets/sitelogo/Logo1.png";
const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return null;
  }

  return children;
};
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      
      <div className="wrapper">
        <div className="top">
        <Link className="navbar-brand" to="/student">
            <img src={Logo} alt="" className="image"  />
          </Link>
      </div>
        <div className="items">
          <div className="item">
            <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Home </span>
            </li>
            </Link>
            </div>
          <div className="item">
            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <ContentPasteIcon className="icon" />
              <span>About </span>
            </li>
          </Link>
            
          </div>
          <div className="item">
            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <ContactsIcon className="icon" />
              <span>Contact Us </span>
            </li>
          </Link>
            
          </div> 
          <RequireAuth>
          <div className="item">
            <Link to="/Login" style={{ textDecoration: "none" }}>
            <li>
              <LoginIcon className="icon" />
              <span>Login </span>
            </li>
          </Link>    
            </div>
            </RequireAuth>
          <div className="item">
            <div className="item">
            <DarkModeOutlinedIcon
              className="darkmode"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            </div>
          </div>
          {/* <div className="item">
            <div className="item">
            <DarkModeOutlinedIcon className="avatar" />
          </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;