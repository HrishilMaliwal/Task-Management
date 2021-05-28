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

    case actions.ADD_USERS: {
      return {
        ...state,
        student_database: [...action.payload]
      }
    }

    case actions.USER_INDEXING: {
      return {
        ...state,
        student_index: [...action.payload]
      }
    }

    case actions.UPDATE_USER: {
      return {
        ...state,
        current_user: {
          id: action.payload.id,
          first: action.payload.first,
          last: action.payload.last,
          email: action.payload.email,
          password: action.payload.password,
          first_login: action.payload.first_login,
          is_student: action.payload.is_student,
        }
      }
    }

    default: {
      return state;
    }
  }
};

export default reducer;
