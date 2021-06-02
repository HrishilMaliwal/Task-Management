import React from "react";
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

const AnswerTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();

  const view = (key) => {
    if (state.current_user.is_student) {
      history.push({ pathname: "/viewmarks", state: { key: key } });
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
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Subject</TableCell>
                <TableCell align="right">Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.assignment_array == ""
                ? customAlert(
                    "No Assignments",
                    "No assignments to view answers of"
                  )
                : state.assignment_array.map((item, key) => {
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
