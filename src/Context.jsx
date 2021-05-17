

import React, { useContext, createContext, useReducer } from 'react';
import initialState from './reducer/initialState';
import reducer from './reducer/appReducer';


const StateContext = createContext();

const StateProvider = ({ children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)} >
            {children}
        </StateContext.Provider>
    )
}

const useGlobalState = () => useContext(StateContext);

export { StateProvider, useGlobalState as default };

