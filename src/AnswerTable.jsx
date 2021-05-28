import React, { useState, useEffect } from "react";
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
import Header from "./Header";
import { useHistory } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AnswerTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const view = (key) => {
    history.push({ pathname: "/viewanswers", state: { key: key } });
  }

  const toHome = () => {
    history.push('/home')
  }

  return (
    <>
      <Header />
      <TableContainer
        component={Paper}
        style={{ marginTop: "30px", width: "max", backgroundColor: "#e6f9ff" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.assignment_array == ""
              ? confirmAlert({
                  title: "No Assignments",
                  message: "No assignments to view answers of",
                  buttons: [
                    {
                      label: "Okay",
                    },
                  ],
                })
              : state.assignment_array.map((item, key) => {
                  if (
                    item.valid_users.indexOf(state.current_user.id) == -1 &&
                    state.current_user.is_student
                  ) {
                    return null;
                  } else {
                    return (
                      <TableRow key={key}>
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={() => view(key)}
                        >
                          {key + 1}
                        </TableCell>
                        <TableCell align="right">{item.name}</TableCell>
                        <TableCell align="right">{item.subject}</TableCell>
                        <TableCell align="right">{item.marks}</TableCell>
                      </TableRow>
                    );
                  }
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={()=>toHome()} className="btn-cntr">Home</button>
    </>
  );
};

export default AnswerTable;
