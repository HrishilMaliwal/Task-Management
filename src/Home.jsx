import React from "react";
import Header from "./Header";
import Tablee from "./Tablee";
import { useHistory } from "react-router";

const Home = () => {

  const history = useHistory()  
  const create = () => {
      history.push('/createtask')
  };

  return (
    <div>
      <Header />
      <button onClick={() => create()}>Create an exam</button>
      <Tablee />
    </div>
  );
};

export default Home;
