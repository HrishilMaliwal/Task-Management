import React, { useState, useEffect } from "react";
import Header from "./Header";
import useGlobalState from "./Context";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { isNullEmpty, customAlert, DTConvert } from "./common";

const UserAnswers = () => {
  const [state, dispatch] = useGlobalState();
  const location = useLocation();
  const history = useHistory();
  const [marks, setMarks] = useState("");
  const [remarks, setRemarks] = useState("");
  const [flag1, setFlag1] = useState(location.state.flag);

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
    if (flag1) {
      state.current_user.marks_array.map((item, key) => {
        if (item.id == location.state.assignment) {
          setMarks(item.marks);
          setRemarks(item.remarks);
        }
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const submit = () => {
    if (isNullEmpty(marks) || isNullEmpty(remarks)) {
      customAlert("Data error", "Please marks and remarks");
    } else if (
      marks > parseInt(state.assignment_array[location.state.assignment].marks)
    ) {
      customAlert("Invalid marks", "Marks exceed maximum marks");
    } else {
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
    }
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
          disabled={flag1}
        ></input>
        <br />
        <textarea
          placeholder="Remarks"
          style={{ width: "159px", height: "77px" }}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          disabled={flag1}
        ></textarea>
        {state.current_user.is_student ? (
          ""
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => submit()}
            style={{
              width: "150px",
              position: "relative",
              top: "30px",
              right: "160px",
            }}
          >
            Submit
          </Button>
        )}
      </div>
      <div className="form">
        {state.student_database[location.state.user].answers_array == "" ? (
          <p>The user has not submitted any answers</p>
        ) : (
          state.student_database[location.state.user].answers_array.map(
            (item, key) => {
              if (item.id == location.state.assignment) {
                return item.ans.map((i, k) => {
                  var temp;
                  if (i.qtype == 5) {
                    if (i.ans == "") {
                      temp = "";
                    } else {
                      temp = DTConvert(i.ans);
                    }
                  } else {
                    temp = i.ans;
                  }
                  return (
                    <>
                      <p style={{ fontWeight: "bold" }}>
                        {k + 1}. {i.ques}
                      </p>
                      <p>Ans. {temp} </p>
                    </>
                  );
                });
              } else {
                // return <p>The user has not submitted any answers2</p>;
                return null;
              }
            }
          )
        )}
      </div>
      <div className="btn-cntr-dual">
        {state.current_user.is_student ? (
          ""
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => back()}
            className="btw"
          >
            Back
          </Button>
        )}
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
    </>
  );
};

export default UserAnswers;
