import React, { useState, useEffect } from "react";
import useGlobalState from "./Context";
import { useHistory, useLocation } from "react-router";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";
import { isPhoneNum, isNullEmpty, customAlert } from "./common";
import readXlsxFile from "read-excel-file";
import Button from "@material-ui/core/Button";
import ReactExport from "react-data-export";

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
  const [message, setMessage] = useState("No file detected");
  const [arr, setArr] = useState([]);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const sample = [];

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

  const readExcel = (file) => {
    readXlsxFile(file).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        const element = rows[i];
        arr.push(element[0]);
      }
    });
    setMessage("File upload successful");
  };

  const edit = () => {
    state.assignment_array[location.state.key].name = name
    state.assignment_array[location.state.key].subject = subject
    state.assignment_array[location.state.key].marks = marks
    history.push('/home')
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
