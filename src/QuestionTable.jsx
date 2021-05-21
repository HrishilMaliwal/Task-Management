import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useGlobalState from "./Context";
import { useHistory } from "react-router";

const QuestionTable = (props) => {
  const history = useHistory();
  const [state, dispatch] = useGlobalState();

  const done = () => {
    state.assignment_array[props.ke].questions = [...props.qArr];
    history.push({ pathname: "/form", state: {key:props.ke} })
  };

  return (
    <>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "30px",
            width: "max",
            backgroundColor: "#e6f9ff",
          }}
        >
            <>
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
                  {props.qArr.map((item, key) => {
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
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <button onClick={() => done()}>Done</button>
            </>
        </TableContainer>
    </>
  );
};

export default QuestionTable;
