import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function isNullEmpty(e) {
  if (e === null || e === "" || e === undefined) {
    return true;
  } else {
    return false;
  }
}
export function isPhoneNum(e) {
  const re = /^[0-9\b]+$/;
  if (re.test(e)) {
    return true;
  } else {
    return false;
  }
}

export function customAlert(title, message) {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Okay",
      },
    ],
  });
}

export function DTConvert(str) {
  var temp = str.split("T");
  var temp1 = temp[0].split("-");
  var temp3 = temp1[2] + "-" + temp1[1] + "-" + temp1[0] + " " + temp[1];
  return temp3;
}
