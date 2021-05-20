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

const CreateForm = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, dispatch] = useGlobalState();
  const [Qtype, setQtype] = useState("");
  const [Ques, setQues] = useState("");
  const [Qarr, setQarr] = useState(state.assignment_array[location.state.key].questions);
  const [Oarr, setOarr] = useState([]);
  const [option, setOption] = useState("");
  const [flag1, setFlag1] = useState(false);
  const [QTarr, setQTarr] = useState([
    { id: 1, type: "text", text: "text" },
    { id: 2, type: "MCQ1", text: "Multiple choice(Single correct)" },
    { id: 3, type: "MCQ2", text: "Multiple choice(Multiple correct)" },
  ]);
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();
  const addcompo = () => {
    var Request = {
      Ques: Ques,
    };
    if (Qtype == "text") {
      Request = { ...Request, Qtype: Qtype, options: ["TextField"] };
    } else if (Qtype == "MCQ1") {
      Request = { ...Request, Qtype: QTarr[1].text, options: Oarr };
    } else if (Qtype == "MCQ2") {
      Request = { ...Request, Qtype: QTarr[2].text, options: Oarr };
    }
    Qarr.push(Request);
    setQtype("");
    setQues("");
    setOarr([]);
  };

  const addOptionsToggle = () => {
    if (Qtype == "MCQ1" || Qtype == "MCQ2") {
      setFlag1(true);
    }
  };

  const addOption = () => {
    Oarr.push(option);
    setOption("");
  };

  const done = () => {
    state.assignment_array[location.state.key].questions = [...Qarr];
    console.log(state);
    history.push({ pathname: "/form", state: {key:location.state.key} })
  };

  return (
    <>
      <Header />
      <div>
        <div style={{ borderBottom: "solid" }}>
          <p>Assignment ID - {location.state.key + 1}</p>
          <p>
            Assignment Name - {state.assignment_array[location.state.key].name}
          </p>
          <div style={{ position: "absolute", left: "300px", top: "88px" }}>
            <p>
              Subject - {state.assignment_array[location.state.key].subject}
            </p>
            <p>Marks - {state.assignment_array[location.state.key].marks}</p>
          </div>
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Qtype}
            onChange={(e) => setQtype(e.target.value)}
          >
            {QTarr.map((item, key) => {
              return <MenuItem value={item.type}>{item.text}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Question"
          autoComplete="Question"
          value={Ques}
          onChange={(e) => setQues(e.target.value)}
        />
        <button onClick={() => addOptionsToggle()} className="btn-create">
          Add Option
        </button>
        <div id="optionsArea"></div>
        {flag1 ? (
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Option"
              autoComplete="Option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            />
            <button className="btn-create" onClick={() => addOption()}>
              Add
            </button>
          </div>
        ) : (
          ""
        )}
        <button onClick={() => addcompo()}>Add Question</button>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "30px",
            width: "max",
            backgroundColor: "#e6f9ff",
          }}
        >
          {Qarr == "" ? (
            ""
          ) : (
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
          )}
        </TableContainer>
      </div>
    </>
  );
};

export default CreateForm;
