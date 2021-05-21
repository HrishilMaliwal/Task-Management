import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGlobalState from "./Context";
import Header from "./Header";
import QuestionTable from "./QuestionTable";

const CreateForm = () => {
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [qType, setQtype] = useState("");
  const [ques, setQues] = useState("");
  const [qArr, setQarr] = useState(
    state.assignment_array[location.state.key].questions
  );
  const [oArr, setOarr] = useState([]);
  const [option, setOption] = useState("");
  const [flag1, setFlag1] = useState(false);

  const [qtArr, setQTarr] = useState([
    { qId: 1, type: "text", text: "Text" },
    { qId: 2, type: "radio", text: "Multiple choice(Single type)" },
    { qId: 3, type: "checkbox", text: "Multiple choice(Multiple type)" },
  ]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  }));
  const classes = useStyles();

  const addcompo = () => {
    var Request = {
      ques: ques,
    };
    if (qType == 1) {
      Request = { ...Request, qType: qtArr[0].text, options: [] };
    } else if (qType == 2) {
      Request = { ...Request, qType: qtArr[1].text, options: oArr };
    } else if (qType == 3) {
      Request = { ...Request, qType: qtArr[2].text, options: oArr };
    }
    qArr.push(Request);
    setQtype("");
    setQues("");
    setOarr([]);
  };

  const addOption = () => {
    var tempArr = option.split(",");
    setOarr(tempArr);
    setOption("");
  };

  useEffect(() => {
    if (qType == 2 || qType == 3) {
      setFlag1(true);
    } else {
      setFlag1(false);
    }
  }, [qType]);

  return (
    <>
      <Header />
      <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
        <div style={{ borderBottom: "solid", paddingLeft: "20px" }}>
          <p>Assignment ID - {location.state.key + 1}</p>
          <p>
            Assignment Name - {state.assignment_array[location.state.key].name}
          </p>
          <div style={{ position: "absolute", left: "300px", top: "86px" }}>
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
            value={qType}
            onChange={(e) => setQtype(e.target.value)}
          >
            {qtArr.map((item, key) => {
              return <MenuItem value={item.qId}>{item.text}</MenuItem>;
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
          style = {{width:"80%"}}
          value={ques}
          onChange={(e) => setQues(e.target.value)}
        />

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
              style={{ width: "80%" }}
            />
            <button
              className="btn-create"
              onClick={() => addOption()}
              style={{ marginTop: "25px" }}
            >
              Add
            </button>
          </div>
        ) : (
          ""
        )}
        <button onClick={() => addcompo()} className="btn-cntr">Add Question</button>
        <QuestionTable ke={location.state.key} qArr={qArr} />
      </div>
    </>
  );
};

export default CreateForm;
