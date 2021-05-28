import React from "react";
import { useHistory } from "react-router";
import useGlobalState from "./Context";
import { set_flag } from "./reducer/action";

const NavBar = () => {
  const history = useHistory();
  const [state, dispatch] = useGlobalState();

  const toProfile = () => {
    history.push("/profile");
  };
  const toLogOut = () => {
    dispatch(set_flag(false))
    history.push("/");
  };
  const toCreateUser = () => {
    history.push("/adduser");
  };
  const toAnswers = () => {
    history.push("/answertable");
  };
  const toReport = () => {};
  return (
    <nav className="links">
      <button className="nav" onClick={() => toProfile()}>
        Profile
      </button>
      {state.current_user.is_student ? (
        ""
      ) : (
        <>
          <button className="nav" onClick={() => toCreateUser()}>
            Create User
          </button>
          <button className="nav" onClick={() => toAnswers()}>
            View Ansers
          </button>
          <button className="nav" onClick={() => toReport()}>
            View report
          </button>
        </>
      )}
      <button className="nav" onClick={() => toLogOut()}>
        Log out
      </button>
    </nav>
  );
};

export default NavBar;
