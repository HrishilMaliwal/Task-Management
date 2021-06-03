import React, { useState, useEffect } from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { customAlert } from "./common";
import { Button } from "@material-ui/core";

const ChangePassword = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const [opass, setOpass] = useState();
  const [npass1, setNpass1] = useState();
  const [npass2, setNpass2] = useState();

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const vali = () => {
    if (opass == state.current_user.password) {
      if (npass1 == npass2) {
        if (state.current_user.is_student) {
          state.current_user.password = npass1;
          var student = state.student_index.indexOf(state.current_user.id);
          state.student_database[student].password = npass1;
          state.current_user.first_login = false;
          state.student_database[student].first_login = false;
          history.push("/home");
        } else {
          state.current_user.password = npass1;
          state.teacher_database[0].password = npass1
          history.push("/home");
        }
      } else {
        customAlert("Password Error", "Passwords entered do not match");
      }
    } else {
      customAlert("Password Error", "Password entered is incorrect");
    }
  };

  return (
    <>
      {state.current_user.first_login ? "" : <Header />}
      <Container component="main">
        <TextField
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Old Password"
          autoComplete="Old Password"
          value={opass}
          onChange={(e) => setOpass(e.target.value)}
        />
        <TextField
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New Password"
          autoComplete="New Password"
          value={npass1}
          onChange={(e) => setNpass1(e.target.value)}
        />
        <TextField
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confirm New Password"
          autoComplete="Confirm New Password"
          value={npass2}
          onChange={(e) => setNpass2(e.target.value)}
        />
        {state.current_user.first_login ? (
          <Button
            variant="contained"
            color="primary"
            className="btn-cntr"
            onClick={() => vali()}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="btn-cntr"
            onClick={() => vali()}
          >
            ChangePassword
          </Button>
        )}
      </Container>
    </>
  );
};

export default ChangePassword;
