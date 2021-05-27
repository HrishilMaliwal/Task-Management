import React from "react";
import Header from "./Header";
import ViewTable from "./ViewTable";
import { useHistory } from "react-router";
import useGlobalState from "./Context";

const Home = () => {
  const history = useHistory();
  const [state, dispatch] = useGlobalState();
  const create = () => {
    history.push("/createtask");
  };

  return (
    <div>
      <Header />
      {state.current_user.is_student ? (
        ""
      ) : (
        <button onClick={() => create()} className="btn-create" style={{}}>
          Create an exam
        </button>
      )}
      <ViewTable />
    </div>
  );
};

export default Home;
