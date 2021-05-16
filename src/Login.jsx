import React from "react";
import './Login.css'

const Login = () => {
  return (
    <div className="container">
      <div className="imgcontainer">
        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>
      </div>

      <div className="container" style={{backgroundColor:"#f1f1f1"}}>
        <button type="button" className="cancelbtn">
          Cancel
        </button>
        <span className="psw">
          htmlForgot <a href="#">password?</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
