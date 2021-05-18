import * as actions from "./actionTypes";

const setFlag = (payload) => {
  return {
    type: actions.SET_FLAG,
    payload,
  };
};

const add_assignment = (payload) => {
  return {
    type: actions.ADD_ASSIGNMENT,
    payload,
  };
};

export { setFlag, add_assignment };
