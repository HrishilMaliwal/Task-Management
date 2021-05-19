import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useGlobalState from "./Context";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const CreateForm = () => {
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [Qtype, setQtype] = useState("");
  const [Ques, setQues] = useState("");
  const [Qarr, setQarr] = useState([]);

  const addcompo = () => {
    console.log(Qtype);
    console.log(Ques);
    var Request = {
      Qtype: Qtype,
      Ques: Ques,
    };
    if (Qtype == "text") {
      Request = { ...Request, options: "TextField" };
    } else if (Qtype == "Multiple choice(Single correct)") {
    }
    Qarr.push(Request);
    setQtype("");
    setQues("");
  };

  const addoptions = () => {
    if (
      Qtype == "Multiple choice(Single correct)" ||
      Qtype == "Multiple choice(Many correct)"
    ) {
      ReactDOM.render(
        <>
          <label>Option 1</label>
          <input type="text" />
        </>,
        document.getElementById("optionsArea")
      );
      ReactDOM.render(
        <>
          <label>Option 2</label>
          <input type="text" />
        </>,
        document.getElementById("optionsArea")
      );
      ReactDOM.render(
        <>
          <label>Option 3</label>
          <input type="text" />
        </>,
        document.getElementById("optionsArea")
      );
      ReactDOM.render(
        <>
          <label>Option 4</label>
          <input type="text" />
        </>,
        document.getElementById("optionsArea")
      );
    }
  };

  return (
    <>
      <Header />
      <div>
        <h3>Assignment ID - {location.state.key}</h3>
        <h3>
          Assignment Name - {state.assignment_array[location.state.key].name}
        </h3>
        <h3>Subject - {state.assignment_array[location.state.key].subject}</h3>
        <h3>Marks - {state.assignment_array[location.state.key].marks}</h3>
        <hr />
        <label>Question</label>
        <input
          type="text"
          value={Ques}
          onChange={(e) => setQues(e.target.value)}
        />
        <label>Question type</label>
        
        <select name="Question type" onChange={(e) => setQtype(e.target.value)}>
          <option></option>
          <option value="text">Text</option>
          <option value="Multiple choice(Single correct)">
            Multiple choice(Single correct)
          </option>
          <option value="Multiple choice(Many correct)">
            Multiple choice(Many correct)
          </option>
        </select>
        <button onClick={() => addoptions()} className="btn-create">
          Add Option
        </button>
        <div id="optionsArea"></div>
        <button onClick={() => addcompo()}>Add</button>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "30px",
            width: "max",
            backgroundColor: "#e6f9ff",
          }}
        >
          {Qarr == "" ? (
            ""
          ) : (
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Question number</TableCell>
                  <TableCell>Question type</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Qarr.map((item, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{item.Qtype}</TableCell>
                      <TableCell>{item.Ques}</TableCell>
                      <TableCell>{item.options}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </>
  );
};

export default CreateForm;
