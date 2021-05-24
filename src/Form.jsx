import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import useGlobalState from "./Context";
import Header from "./Header";

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [flag1, setFlag1] = useState(false);
  
  useEffect(() => {
    var form = document.getElementById("form");
    state.assignment_array[location.state.key].questions.map((item, key) => {
      var lb = document.createElement("label");
      var brk = document.createElement("br");
      lb.innerHTML = key + 1 + ". " + item.ques + ":";
      form.appendChild(lb);
      form.appendChild(brk);

      if (item.options.length > 0) {
        if (item.qType == "Multiple choice(Single type)") {
          item.options.map((i, k) => {
            var brk = document.createElement("br");
            var op = document.createElement("input");
            op.type = "radio";
            op.value = i;
            op.name = item.ques;
            op.disabled;
            var opn = document.createElement("label");
            opn.className = "r-c button";
            opn.innerHTML = i;
            form.appendChild(opn);
            form.appendChild(op);
            form.appendChild(brk);
          });
        } else {
          item.options.map((i, k) => {
            var brk = document.createElement("br");
            var op = document.createElement("input");
            op.type = "checkbox";
            op.value = i;
            op.name = i;
            op.disabled;
            var opn = document.createElement("label");
            opn.className = "r-c button";
            opn.innerHTML = i;
            form.appendChild(opn);
            form.appendChild(op);
            form.appendChild(brk);
          });
        }
      } else {
        var brk = document.createElement("br");
        var ip = document.createElement("textarea");
        ip.className = "ip-textarea";
        ip.placeholder = "Type answer here..";
        ip.disabled
        form.appendChild(ip);
        form.appendChild(brk);
      }
    });
    setFlag1(true);
  }, [state.assignment_array[location.state.key].questions]);

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

  // const generate = () => {
  //   var form = document.getElementById("form");
  //   state.assignment_array[location.state.key].questions.map((item, key) => {
  //     var lb = document.createElement("label");
  //     var brk = document.createElement("br");
  //     lb.innerHTML = key + 1 + ". " + item.ques + ":";
  //     form.appendChild(lb);
  //     form.appendChild(brk);

  //     if (item.options.length > 0) {
  //       if (item.qType == "Multiple choice(Single type)") {
  //         item.options.map((i, k) => {
  //           var brk = document.createElement("br");
  //           var op = document.createElement("input");
  //           op.type = "radio";
  //           op.value = i;
  //           op.name = item.ques;
  //           var opn = document.createElement("label");
  //           opn.className = "r-c button";
  //           opn.innerHTML = i;
  //           form.appendChild(opn);
  //           form.appendChild(op);
  //           form.appendChild(brk);
  //         });
  //       } else {
  //         item.options.map((i, k) => {
  //           var brk = document.createElement("br");
  //           var op = document.createElement("input");
  //           op.type = "checkbox";
  //           op.value = i;
  //           op.name = i;
  //           var opn = document.createElement("label");
  //           opn.className = "r-c button";
  //           opn.innerHTML = i;
  //           form.appendChild(opn);
  //           form.appendChild(op);
  //           form.appendChild(brk);
  //         });
  //       }
  //     } else {
  //       var brk = document.createElement("br");
  //       var ip = document.createElement("textarea");
  //       ip.className = "ip-textarea";
  //       ip.placeholder = "Type answer here..";
  //       form.appendChild(ip);
  //       form.appendChild(brk);
  //     }
  //   });
  //   setFlag1(true);
  // };

  return (
    <>
      <Header />
      {/* <button onClick={() => generate()} className="btn-cntr">
        Generate exam
      </button> */}
      <div
        id="form"
        style={{ padding: "20px", position: "relative", left: "35%" }}
      ></div>
      {flag1 ? (
        <>
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
      ) : (
        ""
      )}
    </>
  );
};

export default Form;
