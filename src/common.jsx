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