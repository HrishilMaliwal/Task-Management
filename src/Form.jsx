import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import useGlobalState from "./Context";
import Header from "./Header";

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [arr1, setArr1] = useState([]);
  const [temp, setTemp] = useState([]);

  const back = () => {
    history.push({
      pathname: "/createform",
      state: { key: location.state.key },
    });
  };

  const done = () => {
    history.push("/home");
  };

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(state));
  }, [state]);

  const submit = () => {
    state.assignment_array[location.state.key].questions.map((item, key) => {
      switch (item.qType) {
        case "Text":
          var answer = {
            qid: item.qid,
            ques: item.ques,
            ans: document.getElementById(item.qid).value,
          };
          break;
        case "Multiple choice(Single type)":
          document.getElementsByName(item.qid).forEach((radio) => {
            if (radio.checked) {
              temp.push(radio.value);
            }
          });
          var answer = {
            qid: item.qid,
            ques: item.ques,
            ans: [...temp],
          };
          temp.length = 0;
          break;
        case "Multiple choice(Multiple type)":
          document.getElementsByName(item.qid).forEach((check) => {
            if (check.checked) {
              temp.push(check.value);
            }
          });
          var answer = {
            qid: item.qid,
            ques: item.ques,
            ans: [...temp],
          };
          temp.length = 0;
          break;
      }
      arr1.push(answer);
    });
    var answer = {
      id: location.state.key,
      ans: [...arr1],
    };
    var student = state.student_index.indexOf(state.current_user.id);
    state.student_database[student].answers_array.push(answer);
    history.push("/home");
  };

  return (
    <>
      <Header />
      <div
        id="form"
        style={{ padding: "20px", position: "relative", left: "35%" }}
      >
        {state.assignment_array[location.state.key].questions.map(
          (item, key) => {
            switch (item.qType) {
              case "Text":
                return (
                  <>
                    <br />
                    <label className="questions">
                      {key + 1}. {item.ques}:
                    </label>
                    <br />
                    {state.current_user.is_student ? (
                      <textarea
                        className="ip-textarea"
                        placeholder="Type answer here..."
                        id={item.qid}
                      />
                    ) : (
                      <textarea
                        className="ip-textarea"
                        placeholder="Type answer here..."
                        disabled
                      />
                    )}
                    <br />
                  </>
                );
              case "Multiple choice(Single type)":
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
                          <label>{i}</label>
                          {state.current_user.is_student ? (
                            <input type="radio" value={i} name={item.qid} />
                          ) : (
                            <input
                              type="radio"
                              value={i}
                              name={item.qid}
                              disabled
                            />
                          )}
                        </>
                      );
                    })}
                  </>
                );
              case "Multiple choice(Multiple type)":
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
                          <label className="r-c-button">{i}</label>
                          {state.current_user.is_student ? (
                            <input
                              type="checkbox"
                              value={i}
                              name={item.qid}
                              className="r-c-button"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              value={i}
                              name={item.qid}
                              disabled
                              className="r-c-button"
                            />
                          )}
                        </>
                      );
                    })}
                  </>
                );
              default:
                break;
            }
          }
        )}
      </div>

      {state.current_user.is_student ? (
        <button
          onClick={() => submit()}
          className="btn-cntr-dual"
          style={{
            marginLeft: "4px",
          }}
        >
          Submit
        </button>
      ) : (
        <button onClick={() => back()} className="btn-cntr-dual">
          Back
        </button>
      )}
      <button
        onClick={() => done()}
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

export default Form;
