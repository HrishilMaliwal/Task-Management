import React from 'react'
import NavBar from './NavBar'
import img from './NMINS Logo.png'

const Header = () => {
    return (
        <header id="head">
            <h1 style={{textAlign:"center"}}>Exam Manager</h1>
            <NavBar/>
            <img id="logo" src={img}/>
        </header>
    )
}

export default Header
