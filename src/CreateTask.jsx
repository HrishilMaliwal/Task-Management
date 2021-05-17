import React, { useState } from "react";

const CreateTask = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [SDT, setSDT] = useState("");
  const [EDT, setEDT] = useState("");
  const [ques, setQues] = useState("");

  const compoAdd = () => {
      console.log(SDT)
  };

  return (
    <div>
      <label>Assignment name</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
      <label>Subject</label>
      <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)}></input>
      <label>Start Date and Time</label>
      <input type="datetime-local" value={SDT} onChange={(e)=>setSDT(e.target.value)}></input>
      <label>End Date and Time</label>
      <input type="datetime-local" value={EDT} onChange={(e)=>setEDT(e.target.value)}></input>
      <label>Question</label>
      <input type="text" value={ques} onChange={(e)=>setQues(e.target.value)}></input>
      <select name="gamemode">
        <option value="Creative">Creative</option>
        <option value="Survival">Survival</option>
        <option value="Adventure">Adventure</option>
        <option value="Amplified">Amplified</option>
      </select>
      <button onClick={() => compoAdd()}>Add</button>
    </div>
  );
};

export default CreateTask;
