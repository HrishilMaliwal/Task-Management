import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { customAlert } from "./common";
import useGlobalState from "./Context";
import Header from "./Header";
import { Button } from "@material-ui/core";

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [arr1, setArr1] = useState([]);
  const [temp, setTemp] = useState([]);
  const [student, setStudent] = useState(
    state.student_index.indexOf(state.current_user.id)
  );
  const [flag, setFlag] = useState(location.state.flag);

  useEffect(() => {});

  const back = () => {
    history.push({
      pathname: "/createform",
      state: { key: location.state.key },
    });
  };

  const toHome = () => {
    history.push("/home");
  };

  const publish = () => {
    state.assignment_array[location.state.key].published = true;
    history.push("/home");
  };

  useEffect(() => {
    if (
      state.current_user.is_student &&
      !(
        state.student_database[student].completed_array.indexOf(
          location.state.key
        ) == -1
      )
    ) {
      state.student_database[student].answers_array.map((item, key) => {
        if (item.id == location.state.key) {
          return item.ans.map((i, k) => {
            if (i.qtype == 1 || i.qtype == 4) {
              return (document.getElementById(i.qid).value = i.ans);
            } else if (i.qtype == 2) {
              return (document.getElementById(i.ans).checked = true);
            } else if (i.qtype == 3) {
              i.ans.map((op, ke) => {
                document.getElementById(op).checked = true;
              });
            }
          });
        }
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const submit = () => {
    state.assignment_array[location.state.key].questions.map((item, key) => {
      var answer = {
        qid: item.qid,
        ques: item.ques,
        qtype: item.qType,
      };
      switch (item.qType) {
        case 1:
          answer = { ...answer, ans: document.getElementById(item.qid).value };
          break;
        case 2:
          document.getElementsByName(item.qid).forEach((radio) => {
            if (radio.checked) {
              temp.push(radio.value);
            }
          });
          answer = { ...answer, ans: [...temp] };
          temp.length = 0;
          break;
        case 3:
          document.getElementsByName(item.qid).forEach((check) => {
            if (check.checked) {
              temp.push(check.value);
            }
          });
          answer = { ...answer, ans: [...temp] };
          temp.length = 0;
          break;
        case 4:
          answer = { ...answer, ans: document.getElementById(item.qid).value };
          break;
        case 5:
          answer = { ...answer, ans: document.getElementById(item.qid).value }
          break;
      }
      arr1.push(answer);
    });
    var answer = {
      id: location.state.key,
      ans: [...arr1],
    };
    state.student_database[student].answers_array.push(answer);
    state.assignment_array[location.state.key].is_done = true;
    state.student_database[student].completed_array.push(location.state.key);
    history.push("/home");
  };

  const ansLenLimit = (e) => {
    if (e.target.value.length > 500) {
      customAlert("Memory error", "Limit question to 500 characters");
      e.preventDefault();
    }
  };

  return (
    <>
      <Header />
      <div className="form">
        {state.assignment_array[location.state.key].questions.map(
          (item, key) => {
            switch (item.qType) {
              case 1:
                return (
                  <>
                    <br />
                    <label className="questions">
                      {key + 1}. {item.ques}:
                    </label>
                    <br />
                    <textarea
                      className="ip-textarea"
                      placeholder="Type answer(500 words limit) here..."
                      id={item.qid}
                      onChange={(e) => ansLenLimit(e)}
                      disabled={flag}
                    />
                    <br />
                  </>
                );

              case 2:
                return (
                  <>
                    <br />
                    <label className="questions">
                      {key + 1}. {item.ques}:
                    </label>
                    <br />
                    {item.options.map((i, k) => {
                      return (
                        <>
                          <input
                            type="radio"
                            value={i}
                            name={item.qid}
                            id={i}
                            disabled={flag}
                          />
                          <label style={{ margin: "10px 10px 0px 3px" }}>
                            {i}
                          </label>
                        </>
                      );
                    })}
                    <br />
                  </>
                );

              case 3:
                return (
                  <>
                    <br />
                    <label className="questions">
                      {key + 1}. {item.ques}:
                    </label>
                    <br />
                    {item.options.map((i, k) => {
                      return (
                        <>
                          <input
                            type="checkbox"
                            value={i}
                            id={i}
                            name={item.qid}
                            disabled={flag}
                          />
                          <label style={{ margin: "10px 10px 0px 3px" }}>
                            {i}
                          </label>
                        </>
                      );
                    })}
                    <br />
                  </>
                );

              case 4:
                return (
                  <>
                    <br />
                    <label className="questions">
                      {key + 1}. {item.ques}:
                    </label>
                    <br />
                    <input
                      type="number"
                      id={item.qid}
                      disabled={flag}
                      className="ip-num"
                    />
                    <br />
                  </>
                );

              case 5:
                return (
                  <>
                    <br />
                    <label className="questions">
                      {key + 1}. {item.ques}:
                    </label>
                    <br />
                    <input
                      type="datetime-local"
                      id={item.qid}
                      disabled={flag}
                    />
                  </>
                );
            }
          }
        )}
      </div>

      {state.current_user.is_student ? (
        <>
          {state.student_database[student].completed_array.indexOf(
            location.state.key
          ) == -1 ? (
            <div className="btn-cntr-dual">
              <Button
                variant="contained"
                color="primary"
                onClick={() => toHome()}
                className="btw"
              >
                Back
              </Button>
              <Button
                className="btw"
                variant="contained"
                color="primary"
                onClick={() => submit()}
                style={{
                  marginLeft: "10px",
                }}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => toHome()}
              className="btn-cntr"
            >
              Back
            </Button>
          )}
        </>
      ) : (
        <>
          {state.assignment_array[location.state.key].published ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => toHome()}
              className="btn-cntr"
            >
              Back
            </Button>
          ) : (
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
                onClick={() => publish()}
                style={{
                  marginLeft: "10px",
                }}
              >
                Publish
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Form;
