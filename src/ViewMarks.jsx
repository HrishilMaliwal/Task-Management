import React from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";

const ViewMarks = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, dispatch] = useGlobalState();

  const toHome = () => {
    history.push("/home");
  };

  const back = () => {
    history.push('/answertable')
  }

  return (
    <>
      <Header />
      <div>
        {state.current_user.marks_array.map((item, key) => {
          if (item.id == location.state.key) {
            return (
              <div id="marks-op">
                <p>Marks obtained - {item.marks}</p>
                <p>Remarks - {item.remarks}</p>
              </div>
            );
          } else {
            return null;
          }
        })}
        {/* <button onClick={() => toHome()} className="btn-cntr">
          Home
        </button> */}
        <div className="btn-cntr-dual">
        <Button
          variant="contained"
          color="primary"
          onClick={() => back()}
          className="btw"
        >
          Back
        </Button>
        <Button
          className="btw"
          variant="contained"
          color="primary"
          onClick={() => toHome()}
          style={{
            marginLeft: "10px",
          }}
        >
          Home
        </Button>
      </div>
      </div>
    </>
  );
};

export default ViewMarks;
