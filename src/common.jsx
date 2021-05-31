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