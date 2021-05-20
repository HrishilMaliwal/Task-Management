import React, { useState } from "react";
import { add_assignment, setFlag } from "./reducer/action";
import ReactDOM from "react-dom";
import useGlobalState from "./Context";
// import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import { isPhoneNum, isNullEmpty } from "./common";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";

const CreateTask = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [SDT, setSDT] = useState("");
  const [EDT, setEDT] = useState("");
  const [state, dispatch] = useGlobalState();
  const history = useHistory();

  const setDT = () => {
    var tempDate = new Date();
    var datetime =
      tempDate.getFullYear() +
      "-0" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      "T" +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes();
    return datetime;
  };

  const [CDT, setCDT] = useState(setDT());

  const compoAdd = () => {
    if (
      isNullEmpty(name) ||
      isNullEmpty(subject) ||
      isNullEmpty(marks) ||
      isNullEmpty(SDT) ||
      isNullEmpty(EDT)
    ) {
      ReactDOM.render(
        alert(" Name, Subject, marks or dates cannot be blank")
        ,
        document.getElementById("mssg")
      );
    } else {
      var Request = {
        name: name,
        subject: subject,
        marks: marks,
        SDT: SDT,
        EDT: EDT,
        status: "Incomplete",
        questions: []
      };
      dispatch(add_assignment(Request));
      history.push("/home");
    }
  };

  const mVali = (e) => {
    if (isPhoneNum(e.target.value) || e.target.value == "") {
      setMarks(e.target.value);
    } else {
      ReactDOM.render(
        alert("Marks can only have numerical data")
           ,
        document.getElementById("mssg")
      );
      e.preventDefault();
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
        <TextField
          id="datetime-local"
          label="Start Date and Time"
          type="datetime-local"
          value={SDT}
          min={CDT}
          onChange={(e) => setSDT(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-local"
          label="End Date and Time"
          type="datetime-local"
          value={EDT}
          min={SDT}
          onChange={(e) => setEDT(e.target.value)}
          style={{ marginLeft: "15px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button onClick={() => compoAdd()}>Add</button>
        <hr />
        <div id="mssg"></div>
      </Container>
    </>
  );
};

export default CreateTask;
