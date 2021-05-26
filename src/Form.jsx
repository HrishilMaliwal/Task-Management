import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import useGlobalState from "./Context";
import Header from "./Header";

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useGlobalState();

  const back = () => {
    history.push({
      pathname: "/createform",
      state: { key: location.state.key },
    });
  };

  const done = () => {
    console.log(state);
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
                    <textarea
                      className="ip-textarea"
                      placeholder="Type answer here..."
                      disabled
                    />
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
                          <input
                            type="radio"
                            value={i}
                            name={item.ques}
                            disabled
                          />
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
                          <input type="checkbox" value={i} name={i} disabled className="r-c-button"/>
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
      <button onClick={() => back()} className="btn-cntr-dual">
        Back
      </button>
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
