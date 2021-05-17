import * as actions from './actionTypes';


const setFlag =(payload) =>{
    return {
        type :actions.SET_FLAG,
        payload
    }
}

export {
   
    setFlag
}