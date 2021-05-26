import React, { useState } from "react";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import useGlobalState from "./Context";
import readXlsxFile from "read-excel-file";
import { add_users } from "./reducer/action";

const CreateUser = () => {
  const [state, dispatch] = useGlobalState();
  const [arr, setArr] = useState([]);

  const readExcel = (file) => {
    readXlsxFile(file).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        const element = rows[i];
        var Request = {
          sapID: element[0],
          first: element[1],
          last: element[2],
          email: element[3],
          password: 12345678,
        };
        arr.push(Request);
      }
    });
  };
  const adduser = () => {
    // state.student_database = [...arr]
    dispatch(add_users(arr));
    // console.log(state);
  };

  return (
    <>
      <Header />
      <div>
        <Container component="main">
          <label>Add user excel file</label>
          <br />
          <input type="file" onChange={(e) => readExcel(e.target.files[0])} />
          <button onClick={() => adduser()} className="btn-cntr">
            Add User
          </button>
        </Container>
      </div>
    </>
  );
};

export default CreateUser;
