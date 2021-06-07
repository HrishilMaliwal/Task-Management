import React, { useState, useEffect } from "react";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import useGlobalState from "./Context";
import readXlsxFile from "read-excel-file";
import { add_users, user_indexing } from "./reducer/action";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { customAlert } from "./common";
import ReactExport from "react-data-export";

const CreateUser = () => {
  const [state, dispatch] = useGlobalState();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [message, setMessage] = useState("No file uploaded");
  const history = useHistory();
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const sample = [];

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const readExcel = (file) => {
    readXlsxFile(file).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        const element = rows[i];
        var Request = {
          id: element[0],
          first: element[1],
          last: element[2],
          email: element[3],
          password: "12345678",
          first_login: true,
          is_student: true,
          answers_array: [],
          marks_array: [],
          completed_array: [],
        };
        arr2.push(element[0]);
        arr1.push(Request);
      }
    });
    setMessage("File upload successful");
  };

  const adduser = () => {
    if (message == "File upload successful") {
      dispatch(user_indexing(arr2));
      dispatch(add_users(arr1));
    } else {
      customAlert("Data error", "No file uploaded");
    }
    history.push('/usertable')
  };

  const back = () => {
    history.push("/usertable");
  };

  return (
    <>
      <Header />
      <div className="page-paddings">
        <Container component="main">
          <label>Add user excel file</label>
          <br />
          <input
            type="file"
            onChange={(e) => readExcel(e.target.files[0])}
            style={{ display: "none" }}
            id="contained-button-file"
          />
          <label htmlFor="contained-button-file">
            <Button
              style={{ margin: "15px 15px 5px 15px" }}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
          <label>{message}</label>
          <br/>
          <ExcelFile element={<Button style={{color:"red"}}>Download sample</Button>}>
            <ExcelSheet data={sample} name="Users">
              <ExcelColumn label="ID" value="ID" />
              <ExcelColumn label="first name" value="first" />
              <ExcelColumn label="last name" value="last" />
              <ExcelColumn label="email" value="email" />
            </ExcelSheet>
          </ExcelFile>
          <Button
            variant="contained"
            color="primary"
            onClick={() => adduser()}
            className="btn-create"
          >
            Add Users
          </Button>
        </Container>
        <hr />
      </div>
      <div className="btn-cntr">
        <Button
          variant="contained"
          color="primary"
          onClick={() => back()}
          className="btw-full"
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default CreateUser;
