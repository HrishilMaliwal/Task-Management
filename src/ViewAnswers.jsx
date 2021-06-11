import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import { Button } from "@material-ui/core";
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
import TextField from "@material-ui/core/TextField";

const ViewAnswers = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const location = useLocation();
  const [searchItem, setSearch] = useState("");

  const view = (key) => {
    history.push({
      pathname: "/useranswers",
      state: { assignment: location.state.key, user: key, flag: false },
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
        <h2 style={{ textAlign: "center" }}>Users</h2>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search First Name"
          className="searchbar"
          onChange={(e) => setSearch(e.target.value)}
        />
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
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
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
                      if (
                        searchItem !== "" &&
                        item.first
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
                            onClick={() => view(key)}
                          >
                            {item.id}
                          </TableCell>
                          <TableCell onClick={() => view(key)}>
                            {item.first}
                          </TableCell>
                          <TableCell>{item.last}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
          onClick={() => toHome()}
          style={{
            marginLeft: "10px",
          }}
        >
          Home
        </Button>
      </div>
    </>
  );
};

export default ViewAnswers;
