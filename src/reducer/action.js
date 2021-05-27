import * as actions from "./actionTypes";

const set_flag = (payload) => {
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

const add_users = (payload) => {
  return {
    type: actions.ADD_USERS,
    payload,
  }
}

const update_user = (payload) => {
  return {
    type: actions.UPDATE_USER,
    payload,
  }
}

const add_questions = (payload) => {
  return {
    type: actions.ADD_QUESTIONS,
    payload,
  }
}

export { set_flag, add_assignment, del_assignment, add_users, update_user, add_questions };
