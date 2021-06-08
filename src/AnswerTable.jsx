import React, { useState } from "react";
import Table from "@material-ui/core/Table";
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
import { customAlert } from "./common";
import TextField from "@material-ui/core/TextField";

const AnswerTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const [searchItem, setSearch] = useState("");

  const view = (key) => {
    if (state.current_user.is_student) {
      // history.push({ pathname: "/viewmarks", state: { key: key } });
      history.push({
        pathname: "/useranswers",
        state: { assignment: key, user: state.student_index.indexOf(state.current_user.id), flag: true },
      });
    } else {
      history.push({ pathname: "/viewanswers", state: { key: key } });
    }
  };

  const toHome = () => {
    history.push("/home");
  };

  return (
    <>
      <Header />
      <div className="page-paddings">
        <h2 style={{ textAlign: "center" }}>Assignment Table</h2>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search Name"
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
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.assignment_array == ""
                ? customAlert(
                    "No Assignments",
                    "No assignments to view answers of"
                  )
                : state.assignment_array.map((item, key) => {
                    if (item.published) {
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
                            onClick={() => view(key)}
                          >
                            {key + 1}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.marks}</TableCell>
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="btn-cntr">
        <Button
          variant="contained"
          color="primary"
          onClick={() => toHome()}
          className="btw-full"
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default AnswerTable;
