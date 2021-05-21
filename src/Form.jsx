import React, { useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import useGlobalState from "./Context";
import Header from "./Header";

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useGlobalState();
  const [flag1, setFlag1] = useState(false);

  const generate = () => {
    //  console.log(location.state.key)
    //  console.log(state.assignment_array[location.state.key])
    //  console.log(state.assignment_array[location.state.key].questions)
    var form = document.getElementById("form");
    state.assignment_array[location.state.key].questions.map((item, key) => {
      var lb = document.createElement("label");
      var brk = document.createElement("br");
      lb.innerHTML = item.ques;
      form.appendChild(lb);
      form.appendChild(brk);

      if (item.options.length >= 1) {
        if (item.qType == "Multiple choice(Single type)") {
          item.options.map((i, k) => {
            var brk = document.createElement("br");
            var op = document.createElement("input");
            op.type = "radio";
            op.value = i;
            op.name = item.ques;
            var opn = document.createElement("label");
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
            var opn = document.createElement("label");
            opn.innerHTML = i;
            form.appendChild(opn);
            form.appendChild(op);
            form.appendChild(brk);
          });
        }
      } else {
        var brk = document.createElement("br");
        var ip = document.createElement("input");
        ip.type = "text";
        form.appendChild(ip);
        form.appendChild(brk);
      }

      // if (item.qType == "text") {
      //   var brk = document.createElement("br");
      //   var ip = document.createElement("input");
      //   ip.type = "text";
      //   form.appendChild(ip);
      //   form.appendChild(brk);
      // } else if (item.qType == "Multiple choice(Single correct)") {
      //   item.options.map((i, k) => {
      //     var brk = document.createElement("br");
      //     var op = document.createElement("input");
      //     op.type = "radio";
      //     op.value = i;
      //     op.name = item.ques;
      //     var opn = document.createElement("label");
      //     opn.innerHTML = i;
      //     form.appendChild(opn);
      //     form.appendChild(op);
      //     form.appendChild(brk);
      //   });
      // } else if (item.qType == "Multiple choice(Multiple correct)") {
      //   item.options.map((i, k) => {
      //     var brk = document.createElement("br");
      //     var op = document.createElement("input");
      //     op.type = "checkbox";
      //     op.value = i;
      //     op.name = i;
      //     var opn = document.createElement("label");
      //     opn.innerHTML = i;
      //     form.appendChild(opn);
      //     form.appendChild(op);
      //     form.appendChild(brk);
      //   });
      // }
    });
    setFlag1(true);
  };

  const done = () => {
    console.log(state);
    // history.push('/home')
  };
  return (
    <>
      <Header />
      <button onClick={() => generate()}>Generate exam</button>
      <div id="form"></div>
      {flag1 ? <button onClick={() => done()}>Finish</button> : ""}
    </>
  );
};

export default Form;
