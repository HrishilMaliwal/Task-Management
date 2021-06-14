import React from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();

  const toHome = () => {
    history.push("/home");
  };
  const changePass = () => {
    history.push("/changepass");
  };
  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center" }}>Welcome</h1>
      <div id="profile">
        <h2>
          {state.current_user.first} {state.current_user.last}
        </h2>
        <h3>SAP ID - {state.current_user.id}</h3>
        <h3>Email ID - {state.current_user.email}</h3>
      </div>
      <div className="btn-cntr-dual" style={{ width: "500px", left: "38%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toHome()}
          style={{ width: "190px" }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changePass()}
          style={{
            marginLeft: "10px",
            width: "190px",
          }}
        >
          Change Password
        </Button>
      </div>
    </>
  );
};

export default Profile;
