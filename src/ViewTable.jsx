import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
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
import TextField from "@material-ui/core/TextField";

const ViewTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const [searchItem, setSearch] = useState("");

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

  const editAssignment = (key) => {
    if (state.assignment_array[key].is_done) {
      customAlert(
        "Edit error",
        "Someone has answered this assignment and it cannot be Edited"
      );
    } else {
      history.push({ pathname: "/editassignment", state: { key: key } });
    }
  };

  const addQues = (key) => {
    if (state.current_user.is_student) {
      var student = state.student_index.indexOf(state.current_user.id);
      if (state.student_database[student].completed_array.indexOf(key) == -1) {
        history.push({ pathname: "/form", state: { key: key, flag: false } });
      } else {
        history.push({ pathname: "/form", state: { key: key, flag: true } });
      }
    } else {
      if (state.assignment_array[key].published) {
        history.push({ pathname: "/form", state: { key: key, flag: true } });
      } else {
        history.push({ pathname: "/createform", state: { key: key } });
      }
    }
  };

  return (
    <div className="page-paddings" style={{ paddingTop: "10px" }}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Search Name"
        className="searchbar"
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer
        component={Paper}
        style={{ marginTop: "30px", width: "max", backgroundColor: "#e6f9ff" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
              {state.current_user.is_student ? (
                ""
              ) : (
                <TableCell>Status</TableCell>
              )}
              <TableCell>Start date-time</TableCell>
              <TableCell>End date-time</TableCell>
              {state.current_user.is_student ? (
                ""
              ) : (
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
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
                    if (item.published || !state.current_user.is_student) {
                      if (
                        searchItem !== "" &&
                        item.name
                          .toLowerCase()
                          .indexOf(searchItem.toLowerCase()) === -1
                      ) {
                        return null;
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={() => addQues(key)}
                          >
                            {key + 1}
                          </TableCell>
                          <TableCell onClick={() => addQues(key)}>
                            {item.name}
                          </TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.marks}</TableCell>
                          {state.current_user.is_student ? (
                            ""
                          ) : (
                            <TableCell>
                              {item.published ? "Published" : "Not published"}
                            </TableCell>
                          )}
                          <TableCell>{item.SDT}</TableCell>
                          <TableCell>{item.EDT}</TableCell>
                          {state.current_user.is_student ? (
                            ""
                          ) : (
                            <TableCell className="btw-full">
                              <Button
                                color="secondary"
                                type="submit"
                                onClick={() => deleteAssignment(key)}
                              >
                                Delete
                              </Button>
                              <Button
                                color="primary"
                                type="submit"
                                onClick={() => editAssignment(key)}
                                style={{ marginLeft: "20px" }}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  }
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewTable;
