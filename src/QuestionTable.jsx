import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useGlobalState from "./Context";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const QuestionTable = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, dispatch] = useGlobalState();
 
  const [Qarr, setQarr] = useState(state.assignment_array[location.state.key].questions);
 
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();

  

  const done = () => {
    state.assignment_array[location.state.key].questions = [...Qarr];
    console.log(state);
    history.push({ pathname: "/form", state: {key:location.state.key} })
  };


  return (
    <>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "30px",
            width: "max",
            backgroundColor: "#e6f9ff",
          }}
        >
            <>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Question number</TableCell>
                    <TableCell>Question type</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Qarr.map((item, key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {key + 1}
                        </TableCell>
                        <TableCell>{item.Qtype}</TableCell>
                        <TableCell>{item.Ques}</TableCell>
                        <TableCell>
                          <ul>
                            {item.options.map((i, k) => {
                              return <li>{i}</li>;
                            })}
                          </ul>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <button onClick={() => done()}>Done</button>
            </>
        </TableContainer>
    </>
  );
};

export default QuestionTable;
