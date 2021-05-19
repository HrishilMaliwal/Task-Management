import React, { useState } from "react";
import { useHistory } from "react-router";
import "./style.css";

const Login = () => {
  const history = useHistory();

  const vali = () => {
    history.push("/home");
  };

  return (
    <div className="container">

      <div className="container">
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <input class="login" type="text" placeholder="Enter Username" name="uname" required />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          class="login"
          required
        />

        <button type="submit" onClick={() => vali()}>
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
