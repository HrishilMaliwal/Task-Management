import React, { useState } from "react";
import Header from "./Header";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import useGlobalState from "./Context";

const CreateUser = () => {
  const [state, dispatch] = useGlobalState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const adduser = () => {
    
  }

  return (
    <>
      <Header />
      <div>
        <Container component="main">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="ID"
            autoComplete="ID"
            disabled
            value={id}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            autoComplete="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            required
            fullWidth
            label="Password"
            autoComplete="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={()=>adduser()} className="btn-cntr">Add User</button>
        </Container>
      </div>
    </>
  );
};

export default CreateUser;
