import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const QuestionTable = (props) => {
  const history = useHistory();
  const [state, dispatch] = useGlobalState();
  const [arr, setArr] = useState(props.qArr);

  const toPreview = () => {
    state.assignment_array[props.ke].questions = [...arr];
    history.push({ pathname: "/form", state: { key: props.ke } });
  };

  const back = () => {
    state.assignment_array[props.ke].questions = [...arr];
    history.push("/home");
  };

  const deleteQues = (key) => {
    var temp = [...arr];
    temp.splice(key, 1);
    setArr(temp);
    state.assignment_array[props.ke].questions = [...arr];
    props.delfunc(temp);
  };

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  return (
    <div className="page-paddings">
      <TableContainer
        component={Paper}
        style={{
          marginTop: "30px",
          width: "max",
          backgroundColor: "#e6f9ff",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question number</TableCell>
              <TableCell>Question type</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((item, key) => {
              return (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{item.qType}</TableCell>
                  <TableCell>{item.ques}</TableCell>
                  <TableCell>
                    <ul>
                      {item.options.map((i, k) => {
                        return <li>{i}</li>;
                      })}
                    </ul>
                  </TableCell>
                  <TableCell className="btw-full">
                    <Button
                      color="secondary"
                      type="submit"
                      onClick={() => deleteQues(key)}
                      style={{ marginLeft: "20px" }}
                      
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
          onClick={() => toPreview()}
          style={{
            marginLeft: "10px",
          }}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default QuestionTable;
