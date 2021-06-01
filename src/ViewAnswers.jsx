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
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { customAlert } from "./common";

const ViewAnswers = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const location = useLocation();

  const view = (key) => {
    history.push({
      pathname: "/useranswers",
      state: { assignment: location.state.key, user: key },
    });
  };

  const toHome = () => {
    history.push("/home");
  };

  const back = () => {
    history.push("/answertable");
  };

  return (
    <>
      <Header />
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
                <TableCell>SAP ID</TableCell>
                <TableCell align="right">First name</TableCell>
                <TableCell align="right">Last name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.assignment_array[location.state.key].valid_users == ""
                ? customAlert(
                    "No Students",
                    "No students were assigned to this assignment"
                  )
                : state.student_database.map((item, key) => {
                    if (
                      state.assignment_array[
                        location.state.key
                      ].valid_users.indexOf(item.id) == -1
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
                            {item.id}
                          </TableCell>
                          <TableCell align="right">{item.first}</TableCell>
                          <TableCell align="right">{item.last}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <button onClick={() => back()} className="btn-cntr-dual">
        Back
      </button>
      <button
        onClick={() => toHome()}
        className="btn-cntr-dual"
        style={{
          marginLeft: "4px",
        }}
      >
        Home
      </button>
    </>
  );
};

export default ViewAnswers;
