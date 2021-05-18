import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const ViewTable = () => {
  const [arr, setArr] = useState([]);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

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
            </TableRow>
          </TableHead>
          <TableBody>
            {arr == "" ? (
              <TableRow>
                <TableCell rowspan="7">No tasks</TableCell>
              </TableRow>
            ) : (
              arr.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.subject}</TableCell>
                    <TableCell align="right">{item.SDT}</TableCell>
                    <TableCell align="right">{item.EDT}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
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
