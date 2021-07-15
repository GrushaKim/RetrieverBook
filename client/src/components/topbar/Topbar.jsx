import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {logoutCall} from '../../apiCalls';
import axios from "axios";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [keyword, setKeyword] = useState("");

  //call for logout
  const handleClick = () => {
    logoutCall(
      dispatch
      );
  }

  //set a keyword to search a friend
  const setSearchHandler = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">RetrieverBook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Link to={`/profile/${keyword}`}>
          <Search className="searchIcon"/>
          </Link>
          <input
            placeholder="Search for your pawtner!"
            className="searchInput"
            onChange={setSearchHandler}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Anytime</span>
          <span className="topbarLink">Anywhere</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">5</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <span className="topbarLink" onClick={handleClick}>Sign out</span>
      </div>
    </div>
  );
}
