import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./style.css";
import { set_flag, update_user } from "./reducer/action";
import useGlobalState from "./Context";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { isNullEmpty } from "./common";

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
      confirmAlert({
        title: "Data not found",
        message: "ID or password cannot be blank",
        buttons: [
          {
            label: "Okay",
          },
        ],
      });
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
          confirmAlert({
            title: "Login Error",
            message: "Password entered is incorrect",
            buttons: [
              {
                label: "Okay",
              },
            ],
          });
        }
      } else {
        var student = state.student_index.indexOf(parseInt(id));
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
          confirmAlert({
            title: "Login Error",
            message: "Password entered is incorrect",
            buttons: [
              {
                label: "Okay",
              },
            ],
          });
        }
      }
    }

    // user = {
    //   id: 7001,
    //   first: "abc",
    //   last: "def",
    //   email: "xyz",
    //   password: "12345678",
    //   first_login: false,
    //   is_student: false
    // };

    // dispatch(update_user(user));
    // dispatch(set_flag(true));
    // if (user.first_login) {
    //   history.push("/changepass");
    // } else {
    //   history.push("/home");
    // }
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
