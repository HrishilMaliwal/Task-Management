import React from 'react'
import NavBar from './NavBar'
import img from './img/NMINS Logo.png'
import { useHistory } from "react-router";

const Header = () => {
    const history = useHistory()

    const toHome = () => {
        history.push('/home')
    }
    
    return (
        <header id="head">
            <h1 style={{textAlign:"center"}} onClick={()=>toHome()}>Exam Manager</h1>
            <NavBar/>
            <img id="logo" src={img} onClick={()=>toHome()}/>
        </header>
    )
}

export default Header
