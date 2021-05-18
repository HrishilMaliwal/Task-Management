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
    //   let newArr = [...state.assignment_array];
    //   newArr.push(action.payload);
    //   let newState = { ...state, assignment_array: newArr };
    //   console.log(newState)
    //   return newState;
      return {
          ...state,
          assignment_array: [...state.assignment_array, action.payload]
      }
    }

    default: {
      return state;
    }
  }
};

export default reducer;
