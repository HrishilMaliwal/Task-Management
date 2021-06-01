import React, { useState, useEffect } from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";

const UserAnswers = () => {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  const history = useHistory();
  const [marks, setMarks] = useState("");
  const [remarks, setRemarks] = useState("");

  const toHome = () => {
    history.push("/home");
  };

  const back = () => {
    history.push({
      pathname: "/viewanswers",
      state: { key: location.state.assignment },
    });
  };

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const submit = () => {
    var request = {
      id: location.state.assignment,
      marks: marks,
      remarks: remarks,
    };
    state.student_database[location.state.user].marks_array.push(request);
    history.push({
      pathname: "/viewanswers",
      state: { key: location.state.assignment },
    });
  };

  return (
    <>
      <Header />
      <div id="marks-area">
        <input
          type="number"
          placeholder="marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        ></input>
        <br />
        <textarea
          placeholder="Remarks"
          style={{ width: "159px", height: "77px" }}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        ></textarea>
        <button
          onClick={() => submit()}
          style={{
            width: "150px",
            position: "relative",
            top: "30px",
            right: "160px",
          }}
        >
          Submit
        </button>
      </div>
      <div>
        {state.student_database[location.state.user].answers_array.map(
          (item, key) => {
            if (item.id == location.state.assignment) {
              return item.ans.map((i, k) => {
                return (
                  <div style={{ padding: "20px", position: "relative", left: "43%" }}>
                    <p style={{ fontWeight: "bold" }}>
                      {k + 1}. {i.ques}
                    </p>
                    <p>Ans. {i.ans} </p>
                  </div>
                );
              });
            } else {
              return null;
            }
          }
        )}
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
