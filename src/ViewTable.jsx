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
import { del_assignment } from "./reducer/action";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";

const ViewTable = () => {
  const [state, dispatch] = useGlobalState();
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const del = (key) => {
    dispatch(del_assignment(key));
  };

  const addQues = (key) => {
    history.push({ pathname: "/createform", state: {key:key} });
  };

  return (
    <>
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
              <TableCell align="right">Start date-time</TableCell>
              <TableCell align="right">End date-time</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.assignment_array == "" ? (
              <Alert severity="info">There are no tasks assigned to you</Alert>
            ) : (
              state.assignment_array.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => addQues(key)}
                    >
                      {key + 1}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.subject}</TableCell>
                    <TableCell align="right">{item.marks}</TableCell>
                    <TableCell align="right">{item.SDT}</TableCell>
                    <TableCell align="right">{item.EDT}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        type="submit"
                        onClick={() => del(key)}
                        style={{ marginLeft: "20px" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewTable;
