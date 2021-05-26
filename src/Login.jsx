import React, { useState } from "react";
import { useHistory } from "react-router";
import "./style.css";
import { set_flag, update_user } from "./reducer/action";
import useGlobalState from "./Context";

const Login = () => {
  const history = useHistory();
  const [state, dispatch] = useGlobalState();
  
  const vali = () => {
    
    var user = {
      id:"2",
      first:"abc",
      last:"def",
      email:"xyz"
    }
    dispatch(update_user(user))
    dispatch(set_flag(true))
    history.push("/home");
  };

  return (
    <div className="container">

      <div className="container">
        <label htmlFor="sapID">
          <b>SAP ID</b>
        </label>
        <input className="login" type="text" placeholder="Enter SAP ID" name="sapID" required />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          className="login"
          required
        />

        <button type="submit" className="btn-cntr" onClick={() => vali()}>
          Login
        </button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>
      </div>

      <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
        <button type="button" className="cancelbtn">
          Cancel
        </button>
        <span className="psw">
          Forgot <a href="#">password?</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
