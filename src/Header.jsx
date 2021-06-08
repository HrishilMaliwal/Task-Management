import React from 'react'
import NavBar from './NavBar'
import img from './img/NMINS Logo.png'
import useGlobalState from "./Context";
import { useHistory } from "react-router";

const Header = () => {
    const history = useHistory()
    const [state, dispatch] = useGlobalState()

    const toHome = () => {
        history.push('/home')
    }
    
    return (
        <header id="head">
            <h1 style={{textAlign:"center"}} onClick={()=>toHome()}>Exam Manager</h1>
            <p id="user-id">{state.current_user.id}</p>
            <NavBar/>
            <img id="logo" src={img} onClick={()=>toHome()}/>
        </header>
    )
}

export default Header
