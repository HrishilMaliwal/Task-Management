import React, { useState, useEffect } from "react";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import useGlobalState from "./Context";
import readXlsxFile from "read-excel-file";
import { add_users, user_indexing } from "./reducer/action";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const CreateUser = () => {
  const [state, dispatch] = useGlobalState();
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [message, setMessage] = useState("No file uploaded");
  const history = useHistory();

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
    dispatch(user_indexing(arr2));
    dispatch(add_users(arr1));
    history.push("/home");
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
              style={{ margin: "15px 15px 0px" }}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
          <label>{message}</label>
          <Button
            variant="contained"
            color="primary"
            onClick={() => adduser()}
            className="btn-cntr"
          >
            Add Users
          </Button>
        </Container>
      </div>
    </>
  );
};

export default CreateUser;
