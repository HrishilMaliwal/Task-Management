import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./style.css";
import { set_flag, update_user } from "./reducer/action";
import useGlobalState from "./Context";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { customAlert, isNullEmpty } from "./common";

const Login = () => {
  const history = useHistory();
  const [state, dispatch] = useGlobalState();
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const vali = () => {
    var user = {};
    if (isNullEmpty(id) || isNullEmpty(pass)) {
      customAlert("Data not found", "ID or password cannot be blank");
    } else {
      if (id[0] == "6") {
        if (id == "6001" && pass == "1234") {
          user = { ...state.teacher_database[0] };
          dispatch(update_user(user));
          dispatch(set_flag(true));
          if (user.first_login) {
            history.push("/changepass");
          } else {
            history.push("/home");
          }
        } else {
          customAlert("Login Error", "Password entered is incorrect");
        }
      } else {
        var student = state.student_index.indexOf(parseInt(id));
        if (student == -1) {
          customAlert("Login Error", "Password entered is incorrect");
        } else {
          if (pass == state.student_database[student].password) {
            user = { ...state.student_database[student] };
            dispatch(update_user(user));
            dispatch(set_flag(true));
            if (user.first_login) {
              history.push("/changepass");
            } else {
              history.push("/home");
            }
          } else {
            customAlert("Login Error", "Password entered is incorrect");
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="container">
        <label htmlFor="sapID">
          <b>SAP ID</b>
        </label>
        <input
          className="login"
          type="text"
          placeholder="Enter SAP ID"
          name="sapID"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          className="login"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button type="submit" className="btn-cntr" onClick={() => vali()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
