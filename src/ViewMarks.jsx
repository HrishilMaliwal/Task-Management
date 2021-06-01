import React, { useState, useEffect } from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

const ViewMarks = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, dispatch] = useGlobalState();

  const toHome = () => {
    history.push("/home");
  };

  return (
    <>
      <Header />
      <div>
        {state.current_user.marks_array.map((item, key) => {
          if (item.id == location.state.key) {
            return (
              <div>
                <p>Marks obtained - {item.marks}</p>
                <p>Remarks - {item.remarks}</p>
              </div>
            );
          } else {
            return null;
          }
        })}
        <button onClick={() => toHome()} className="btn-cntr">
          Home
        </button>
      </div>
    </>
  );
};

export default ViewMarks;
