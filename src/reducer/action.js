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

const del_assignment = (payload) => {
  return{
    type: actions.DEL_ASSIGNMENT,
    payload,
  }
}

export { setFlag, add_assignment, del_assignment };
