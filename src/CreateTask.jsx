import React from 'react'

const CreateTask = () => {
    return (
        <div>
            <input type="text"></input>
            <select name="gamemode">
				<option value = "Creative">Creative</option>
				<option value = "Survival">Survival</option>
				<option value = "Adventure">Adventure</option>
				<option value = "Amplified">Amplified</option>				
			</select>
            <button onClick={()=>{}}>Add</button>
        </div>
    )
}

export default CreateTask
