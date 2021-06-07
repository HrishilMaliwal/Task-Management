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
import { customAlert } from "./common";
import { Button } from "@material-ui/core";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";

const UserTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const [searchItem, setSearch] = useState("");

  const edit = (key) => {
    history.push({ pathname: "/edituser", state: { key: key, flag: true } });
  };

  const add = () => {
    history.push({ pathname: "/adduser", state: { flag: false } });
  };

  const back = () => {
    history.push("/home");
  };
  return (
    <>
      <Header />
      <div className="page-paddings">
        <h2 style={{ textAlign: "center" }}>User Table</h2>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
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
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.student_database == ""
                ? customAlert("No Users", "No Users exist in the database")
                : state.student_database.map((item, key) => {
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
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.first}</TableCell>
                        <TableCell>{item.last}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          <Button color="primary" onClick={() => edit(key)}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => back()}
          className="btn-cntr"
          style={{
            marginTop: "10px",
          }}
        >
          Back
        </Button>
        <Button
          className="btn-create"
          variant="contained"
          color="primary"
          onClick={() => add()}
          style={{
            marginTop: "10px",
          }}
        >
          Add Users
        </Button>
      </div>
    </>
  );
};

export default UserTable;
