import initialState from './initialState';
import * as actions from './actionTypes';

const reducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
       
        case actions.SET_FLAG: {
            return {
                ...state,
                flag: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default reducer;