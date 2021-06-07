import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { customAlert, isNullEmpty } from "./common";
import useGlobalState from "./Context";
import Header from "./Header";
import QuestionTable from "./QuestionTable";
import Button from "@material-ui/core/Button";

const CreateForm = () => {
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [qType, setQtype] = useState("");
  const [ques, setQues] = useState("");
  const [qArr, setQarr] = useState(
    state.assignment_array[location.state.key].questions
  );
  const [option, setOption] = useState("");
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false)
  const [index, setIndex] = useState("")

  const [qtArr, setQTarr] = useState([
    { qId: 1, text: "Text" },
    { qId: 2, text: "Multiple choice(Single type)" },
    { qId: 3, text: "Multiple choice(Multiple type)" },
    { qId: 4, text: "Integer"},
    { qId: 5, text: "Date and Time"}
  ]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  }));
  const classes = useStyles();

  const addcompo = () => {
    if (isNullEmpty(qType) || isNullEmpty(ques)) {
      customAlert("Data Error", "Question type or question cannot be empty");
    } else if (
      qArr.length > parseInt(state.assignment_array[location.state.key].marks) - 1
    ) {
      customAlert(
        "Too many questions",
        "Keep questions less than the marks number"
      );
    } else {
      var tempArr = [];
      var tempFlag = true;
      if (qType == 2 || qType == 3) {
        if (isNullEmpty(option)) {
          customAlert("Input Error", "Options cannot be blank");
          tempFlag = false;
        } else {
          tempArr = option.split(",");
          setOption("");
        }
      }
      if (tempFlag) {
        var Request = {
          qid: Math.floor(Math.random() * 10000),
          ques: ques,
        };
        if (qType == 1) {
          Request = { ...Request, qText: qtArr[0].text, options: [], qType: 1};
        } else if (qType == 2) {
          Request = { ...Request, qText: qtArr[1].text, options: tempArr, qType: 2 };
        } else if (qType == 3) {
          Request = { ...Request, qText: qtArr[2].text, options: tempArr, qType: 3 };
        } else if (qType == 4) {
          Request = { ...Request, qText: qtArr[3].text, options: [], qType: 4}
        } else if (qType == 5) {
          Request = { ...Request, qText: qtArr[4].text, options: [], qType: 5}
        }
        if(flag2){
          qArr.splice(index, 1, Request)
          setQtype("");
          setQues("");
          setFlag2(false)
        } else {
          qArr.push(Request);
          setQtype("");
          setQues("");
        }

      }
    }
  };

  const delParent = (arr) => {
    setQarr(arr);
  };

  const qLenLimit = (e) => {
    if (e.target.value.length > 200) {
      e.preventDefault();
      customAlert("Memory error", "Limit question to 100 characters");
    } else {
      setQues(e.target.value);
    }
  };

  const edit = (key) => {
    setIndex(key)
    setQtype(state.assignment_array[location.state.key].questions[key].qType)
    setQues(state.assignment_array[location.state.key].questions[key].ques)
    setOption(String(state.assignment_array[location.state.key].questions[key].options))
    setFlag2(true)
  }


  useEffect(() => {
    if (qType == 2 || qType == 3) {
      setFlag1(true);
    } else {
      setFlag1(false);
    }
  }, [qType]);

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Header />
      <div className="page-paddings">
        <div style={{ borderBottom: "solid", paddingLeft: "20px" }}>
          <p>Assignment ID - {location.state.key + 1}</p>
          <p>
            Assignment Name - {state.assignment_array[location.state.key].name}
          </p>
          <div style={{ position: "absolute", left: "420px", top: "148px" }}>
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
          style={{ width: "80%" }}
          value={ques}
          onChange={(e) => qLenLimit(e)}
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
          </div>
        ) : (
          ""
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => addcompo()}
          className="btn-cntr"
        >
          Add Question
        </Button>
        <QuestionTable
          ke={location.state.key}
          qArr={qArr}
          delfunc={delParent}
          editfunc={edit}
        />
      </div>
    </>
  );
};

export default CreateForm;
