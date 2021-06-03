import React from "react";
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

const UserTable = () => {
    const [state, dispatch] = useGlobalState()
    const history = useHistory()

    const edit = (key) => {
        history.push({ pathname: "/edituser", state: { key: key } });
    }
    return (
    <div className="page-paddings">
        <h2 style={{textAlign:"center"}}>User Table</h2>
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
              <TableCell>Sr. No</TableCell>
              <TableCell>SAP ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.student_database == ""
              ? customAlert(
                  "No Users",
                  "No Users exist in the database"
                )
              : state.student_database.map((item, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        {key + 1}
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.first}</TableCell>
                      <TableCell>{item.last}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                          <Button color="primary" onClick={()=>edit(key)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
