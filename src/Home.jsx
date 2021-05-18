import React from "react";
import Header from "./Header";
import ViewTable from "./ViewTable";
import { useHistory } from "react-router";

const Home = () => {

  const history = useHistory()  
  const create = () => {
      history.push('/createtask')
  };

  return (
    <div>
      <Header />
      <button onClick={() => create()}  className="btn-create">Create an exam</button>
      <ViewTable />
    </div>
  );
};

export default Home;
