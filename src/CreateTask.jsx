import React, { useState, useEffect } from "react";
import { add_assignment } from "./reducer/action";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import { isPhoneNum, isNullEmpty, customAlert } from "./common";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";
import readXlsxFile from "read-excel-file";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CreateTask = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [SDT, setSDT] = useState("");
  const [EDT, setEDT] = useState("");
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const [message, setMessage] = useState("No file detected");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

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
      confirmAlert({
        title: "Data not found",
        message: "Name, Subject, marks or dates cannot be blank",
        buttons: [
          {
            label: "Okay",
          },
        ],
      });
    } else if (arr.length == 0) {
      customAlert("Data not found", "Upload user excel");
    } else {
      var Request = {
        name: name,
        subject: subject,
        marks: marks,
        SDT: SDT,
        EDT: EDT,
        questions: [],
        valid_users: [...arr],
      };
      dispatch(add_assignment(Request));
      history.push("/home");
    }
  };

  const mVali = (e) => {
    if (isPhoneNum(e.target.value) || e.target.value == "") {
      setMarks(e.target.value);
    } else {
      confirmAlert({
        title: "Invalid Data",
        message: "Marks can only be number",
        buttons: [
          {
            label: "Okay",
          },
        ],
      });
      e.preventDefault();
    }
  };

  const readExcel = (file) => {
    readXlsxFile(file).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        const element = rows[i];
        arr.push(element[0]);
      }
    });
    setMessage("File upload successful");
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
        <label>Start Date and Time - </label>
        <input
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
        <br />
        <label>End Date and Time - </label>
        <input
          id="datetime-local"
          label="End Date and Time"
          type="datetime-local"
          value={EDT}
          min={SDT}
          onChange={(e) => setEDT(e.target.value)}
          style={{ marginLeft: "6px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <label>Add user excel file</label>
        <br />
        <input
          type="file"
          onChange={(e) => {
            readExcel(e.target.files[0]);
          }}
          style={{ display: "none" }}
          id="contained-button-file"
        />
        <label htmlFor="contained-button-file">
          <Button
            style={{ margin: "15px 15px 0px 0px" }}
            variant="contained"
            color="primary"
            component="span"
          >
            Upload
          </Button>
        </label>
        <label>{message}</label>
        <button onClick={() => compoAdd()} className="btn-cntr">
          Add
        </button>
        <hr />
      </Container>
    </>
  );
};

export default CreateTask;
