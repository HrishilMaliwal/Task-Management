import React, { useState, useEffect } from "react";
import useGlobalState from "./Context";
import { useHistory, useLocation } from "react-router";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";
import { isPhoneNum, isNullEmpty, customAlert } from "./common";
import Button from "@material-ui/core/Button";

const EditAssignment = () => {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  const [name, setName] = useState(
    state.assignment_array[location.state.key].name
  );
  const [subject, setSubject] = useState(
    state.assignment_array[location.state.key].subject
  );
  const [marks, setMarks] = useState(
    state.assignment_array[location.state.key].marks
  );
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const mVali = (e) => {
    if (isPhoneNum(e.target.value) || e.target.value == "") {
      setMarks(e.target.value);
    } else {
      customAlert("Invalid Data", "Marks can only be number");
      e.preventDefault();
    }
  };

  const edit = () => {
    if (marks < state.assignment_array[location.state.key].questions.length) {
      customAlert("Not allowed", "Marks cant be this low");
    } else {
      state.assignment_array[location.state.key].name = name;
      state.assignment_array[location.state.key].subject = subject;
      state.assignment_array[location.state.key].marks = marks;
      history.push("/home");
    }
  };

  return (
    <>
      <Header />
      <Container component="main">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Assignment name"
          autoComplete="Assignment name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Subject name"
          autoComplete="Subject name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Marks"
          autoComplete="Marks"
          value={marks}
          onChange={(e) => mVali(e)}
        />
        <Button
          variant="contained"
          color="primary"
          className="btn-create"
          onClick={() => edit()}
        >
          Save
        </Button>
      </Container>
    </>
  );
};

export default EditAssignment;
