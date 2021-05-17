import React from 'react'
import {useHistory} from 'react-router'

const Header = () => {
    const history = useHistory()
    const toProfile = () =>
    {
        history.push('/profile')
    }
    const toLogOut = () =>{
        history.push('/')
    }
    return (
        <header>
            <h1>Exam Manager</h1>
            <details>
                <summary>...</summary>
                <button onClick={()=>console.log("1")}  >Profile</button>
                <button onClick={()=>console.log("2")}>Log out</button>
            </details>
            <hr/>
        </header>
    )
}

export default Header
