import React, { useState, useEffect } from "react";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Header from "./Header";
import Button from "@material-ui/core/Button";

const EditUser = () => {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  const history = useHistory();
  const [first, setFirst] = useState(
    state.student_database[location.state.key].first
  );
  const [last, setLast] = useState(
    state.student_database[location.state.key].last
  );
  const [email, setEmail] = useState(
    state.student_database[location.state.key].email
  );

  const back = () => {
    history.push('/adduser')
  }

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const submit = () => {
    state.student_database[location.state.key].first = first
    state.student_database[location.state.key].last = last
    state.student_database[location.state.key].email = email
    history.push('/adduser')
  }

  return (
    <>
      <Header />
      <Container component="main">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="SAP ID"
          autoComplete="SAP ID"
          value={state.student_database[location.state.key].id}
          disabled
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="First name"
          autoComplete="First name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Last name"
          autoComplete="Last name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          autoComplete="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="btn-cntr-dual">
          <Button
            variant="contained"
            color="primary"
            onClick={() => back()}
            className="btw"
          >
            Back
          </Button>
          <Button
            className="btw"
            variant="contained"
            color="primary"
            onClick={() => submit()}
            style={{
              marginLeft: "10px",
            }}
          >
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default EditUser;
