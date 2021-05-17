import React from 'react'

const Header = () => {
    return (
        <header>
            <h1>Exam Manager</h1>
            <details>
                <summary>...</summary>
                <button onClick={()=>console.log("1")}>Profile</button>
                <button onClick={()=>console.log("2")}>Log out</button>
            </details>
            <hr/>
        </header>
    )
}

export default Header
