import React from 'react'
import { useState, useEffect } from 'react'

 const User = (props) => {

    // console.log(props, "PROPS")
    
    useEffect(() => {

    },[])
     
    let perm = props.permissions ? props.permissions : undefined 
    let userPerm = perm?.filter(obj => obj[Object.keys(obj)] === true)


     return (
        <div style={{border: "1px solid black"}}>

            <p>Name: {props.name}</p>
            <p>Username: {props.username}</p>
            <p>Session Timeout: {props.session}</p>
            
            Permissions: 
            {
                userPerm?.map((obj,i) => <div key={i}>{ Object.keys(obj) } </div>)
            }

            <br />
            <input type="button" value="Edit" onClick={() => props.edit(props.id)} /> {" "}
            <input type="button" value="Delete" onClick={() => props.delete(props.id)} /> <br /> <br />

        </div>
    )
}

export default User