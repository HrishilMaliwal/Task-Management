import React from "react";
import Header from "./Header";
import ViewTable from "./ViewTable";
import { useHistory } from "react-router";
import useGlobalState from "./Context";
import Button from "@material-ui/core/Button";

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
        <div className="btn-create">
          <Button variant="contained" color="primary" onClick={() => create()}>
            Create exam
          </Button>
        </div>
      )}
      <ViewTable />
    </div>
  );
};

export default Home;
