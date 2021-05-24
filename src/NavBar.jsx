import React from "react";
import { useHistory } from "react-router";

const NavBar = () => {
  const history = useHistory();
  const toProfile = () => {
    history.push("/profile");
  };
  const toLogOut = () => {
    history.push("/");
  };
  const toCreateUser = () => {
    history.push("/adduser");
  };
  const toAnswers = () => {};
  const toReport = () => {};
  return (
    <nav className="links">
      <button className="nav" onClick={() => toProfile()}>
        Profile
      </button>
      <button className="nav" onClick={() => toCreateUser()}>
        Create User
      </button>
      <button className="nav" onClick={() => toAnswers()}>
        View Ansers
      </button>
      <button className="nav" onClick={() => toReport()}>
        View report
      </button>
      <button className="nav" onClick={() => toLogOut()}>
        Log out
      </button>
    </nav>
  );
};

export default NavBar;
