import React, { useState, useEffect } from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useHistory } from "react-router";

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory()

    const toHome = () =>
    {
        history.push('/home')
    }
    const changePass = () =>
    {
        history.push('/changepassword')
    }
  return (
    <>
      <Header />
      <h1 style={{textAlign:"center"}}>Welcome</h1>
      <div id="profile">
        <h2>{state.current_user.first} {state.current_user.last}</h2>
        <h3>SAP ID - {state.current_user.id}</h3>   
        <h3>Email ID - {state.current_user.email}</h3> 
      </div>
      <button onClick={() => toHome()} className="btn-cntr-dual" style={{}}>
            Home
        </button>
        <button
          onClick={() => changePass()}
          className="btn-cntr-dual"
          style={{
            marginLeft: "4px",
            marginTop:"10px",
          }}
        >
          Change Password
        </button>
    </>
  );
};

export default Profile;
