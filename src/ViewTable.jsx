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
import { del_assignment } from "./reducer/action";
import { useHistory } from "react-router";
import { customAlert } from "./common";

const ViewTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const deleteAssignment = (key) => {
    if (state.assignment_array[key].is_done) {
      customAlert(
        "Delete error",
        "Someone has answered this assignment and it cannot be deleted"
      );
    } else {
      dispatch(del_assignment(key));
    }
  };

  const addQues = (key) => {
    if (
      state.current_user.is_student ||
      state.assignment_array[key].published
    ) {
      history.push({ pathname: "/form", state: { key: key } });
    } else {
      history.push({ pathname: "/createform", state: { key: key } });
    }
  };

  return (
    <div className="page-paddings" style={{paddingTop:"10px"}}>
      <TableContainer
        component={Paper}
        style={{ marginTop: "30px", width: "max", backgroundColor: "#e6f9ff" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Marks</TableCell>
              <TableCell align="right">Start date-time</TableCell>
              <TableCell align="right">End date-time</TableCell>
              {state.current_user.is_student ? (
                ""
              ) : (
                <TableCell align="right"></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.assignment_array == ""
              ? customAlert(
                  "No Assignments",
                  "There are no assignments assigned to you"
                )
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
                          onClick={() => addQues(key)}
                        >
                          {key + 1}
                        </TableCell>
                        <TableCell align="right">{item.name}</TableCell>
                        <TableCell align="right">{item.subject}</TableCell>
                        <TableCell align="right">{item.marks}</TableCell>
                        <TableCell align="right">{item.SDT}</TableCell>
                        <TableCell align="right">{item.EDT}</TableCell>
                        {state.current_user.is_student ? (
                          ""
                        ) : (
                          <TableCell className="btw-full">
                            <Button
                              color="secondary"
                              type="submit"
                              onClick={() => deleteAssignment(key)}
                              style={{ marginLeft: "20px" }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  }
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewTable;
