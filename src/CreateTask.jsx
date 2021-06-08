import React, { useState, useEffect } from "react";
import { add_assignment } from "./reducer/action";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import { isPhoneNum, isNullEmpty, customAlert, DTConvert } from "./common";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";
import readXlsxFile from "read-excel-file";
import Button from "@material-ui/core/Button";
import ReactExport from "react-data-export";
import { useLocation } from "react-router-dom";

const CreateTask = () => {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [SDT, setSDT] = useState("");
  const [EDT, setEDT] = useState("");
  const history = useHistory();
  const [message, setMessage] = useState("No file detected");
  const [arr, setArr] = useState([]);
  const [flag1, setFlag1] = useState(location.state.flag);
  const [index, setIndex] = useState("");
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const sample = [];

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (flag1) {
      setIndex(location.state.key);
      setName(state.assignment_array[location.state.key].name);
      setSubject(state.assignment_array[location.state.key].subject);
      setMarks(state.assignment_array[location.state.key].marks);
    }
  },[]);

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
      customAlert(
        "Data not found",
        "Name, Subject, marks or dates cannot be blank"
      );
    } else if (arr.length == 0) {
      customAlert("Data not found", "Upload user excel");
    } else {
      var Stemp = DTConvert(SDT)
      var Etemp = DTConvert(EDT)
      var Request = {
        name: name,
        subject: subject,
        marks: marks,
        SDT: Stemp,
        EDT: Etemp,
        questions: [],
        valid_users: [...arr],
        published: false,
        is_done: false,
      };
      if (flag1) {
        state.assignment_array.splice(index, 1, Request);
      } else {
        dispatch(add_assignment(Request));
      }
      history.push("/home");
    }
  };

  const mVali = (e) => {
    if (isPhoneNum(e.target.value) || e.target.value == "") {
      setMarks(e.target.value);
    } else {
      customAlert("Invalid Data", "Marks can only be number");
      e.preventDefault();
    }
  };

  const DT = (val) => {
    setSDT(val);
    setEDT("");
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
          type="datetime-local"
          value={SDT}
          min={CDT}
          onChange={(e) => DT(e.target.value)}
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
        <br />
        <ExcelFile
          element={<Button style={{ color: "red" }}>Download sample</Button>}
        >
          <ExcelSheet data={sample} name="Users">
            <ExcelColumn label="ID" value="ID" />
            <ExcelColumn label="first name" value="first" />
            <ExcelColumn label="last name" value="last" />
          </ExcelSheet>
        </ExcelFile>
        <Button
          variant="contained"
          color="primary"
          className="btn-create"
          onClick={() => compoAdd()}
        >
          Add
        </Button>
        <hr />
      </Container>
    </>
  );
};

export default CreateTask;
