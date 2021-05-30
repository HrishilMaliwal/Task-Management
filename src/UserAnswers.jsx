import React, { useState, useEffect } from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";

const UserAnswers = () => {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  const history = useHistory();

  const toHome = () => {
    history.push("/home");
  };

  const back = () => {
    history.push({
      pathname: "/viewanswers",
      state: { key: location.state.assignment },
    });
  };

  return (
    <>
      <Header />
      <div>
        {state.student_database[location.state.user].answers_array[
          location.state.assignment
        ].ans.map((item, key) => {
          return (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: "bold" }}>
                {key + 1}. {item.ques}
              </p>
              <p>Ans. {item.ans} </p>
            </div>
          );
        })}
      </div>
      <button onClick={() => back()} className="btn-cntr-dual">
        Back
      </button>
      <button
        onClick={() => toHome()}
        className="btn-cntr-dual"
        style={{
          marginLeft: "4px",
        }}
      >
        Home
      </button>
    </>
  );
};

export default UserAnswers;
