import initialState from "./initialState";
import * as actions from "./actionTypes";

const reducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case actions.SET_FLAG: {
      return {
        ...state,
        flag: action.payload,
      };
    }

    case actions.ADD_ASSIGNMENT: {
      return {
        ...state,
        assignment_array: [...state.assignment_array, action.payload],
      };
    }

    case actions.DEL_ASSIGNMENT: {
      let arr = [...state.assignment_array]
      arr.splice(action.payload, 1)
      return {
        ...state,
        assignment_array: arr,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
