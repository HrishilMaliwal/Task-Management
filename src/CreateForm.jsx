import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import useGlobalState from "./Context";
import Header from "./Header";
import QuestionTable from './QuestionTable'

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
    { qId: 1, type: "text", text: "Text" },
    { qId: 2, type: "radio", text: "Multiple choice(Single type)" },
    { qId: 3, type: "checkbox", text: "Multiple choice(Multiple type)" },
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
      Request = { ...Request, Qtype: Qtype, options: [""] };
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

  

  const addOption = () => {
    Oarr.push(option);
    setOption("");
  };



  const changeQtype =(e)=>{
    console.log(`e`,e.target.value)
    setQtype(e.target.value)
    if (Qtype == 2 || Qtype == 3) {
      setFlag1(true);
    }
    else{
      setFlag1(false)
    }
  }
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
            onChange={(e) => changeQtype(e)}
          >
            {QTarr.map((item, key) => {
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
          value={Ques}
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
            />
            <button className="btn-create" onClick={() => addOption()}>
              Add
            </button>
          </div>
        ) : (
          ""
        )}
        <button onClick={() => addcompo()}>Add Question</button>
         <QuestionTable/>
      </div>
    </>
  );
};

export default CreateForm;
