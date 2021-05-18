import React, { useState } from "react";
import { add_assignment, setFlag } from "./reducer/action";
import useGlobalState from "./Context";
import { useHistory } from "react-router";

const CreateTask = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [SDT, setSDT] = useState("");
  const [EDT, setEDT] = useState("");
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  // const [ques, setQues] = useState("");
  // const [Qtype, setQtype] = useState("");

  const compoAdd = () => {
    var Request = {
      name: name,
      subject: subject,
      marks: marks,
      SDT: SDT,
      EDT: EDT,
      status: "Incomplete"
    };
    dispatch(add_assignment(Request));
    history.push("/home");
  };

  return (
    <div>
      <label>Assignment name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      ></input>
      <label>Marks</label>
      <input
        type="text"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      ></input>
      <label>Start Date and Time</label>
      <input
        type="datetime-local"
        value={SDT}
        onChange={(e) => setSDT(e.target.value)}
      ></input>
      <label>End Date and Time</label>
      <input
        type="datetime-local"
        value={EDT}
        onChange={(e) => setEDT(e.target.value)}
      ></input>
      {/* <label>Question</label> */}
      {/* <input
        type="text"
        value={ques}
        onChange={(e) => setQues(e.target.value)}
      ></input> */}
      {/* <select name="QType" onChange={(e)=>setQtype(e.target.value)}>
        <option value=""></option>
        <option value="text">Text field</option>
        <option value="mcq1">MCQ(one correct)</option>
        <option value="mcq2 ">MCQ(multiple correct)</option>
      </select> */}
      <button onClick={() => compoAdd()}>Add</button>
      <hr />
    </div>
  );
};

export default CreateTask;
