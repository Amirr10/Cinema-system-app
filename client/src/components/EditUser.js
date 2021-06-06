import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setAllUsers } from '../redux/action'
import Checkbox from './Checkbox'

 const EditUser = (props) => {

    const dispatch = useDispatch()
    const { user: { details, permissions, username: newUsername } } = useSelector(state => state.getUser)

    const [firstname, setFirstname] = useState(details.firstName)
    const [lastname, setLastname] = useState(details.lastName)
    const [username, setUsername] = useState(newUsername)
    const [session, setSession] = useState(details.sessionTimeout)
    const [type, setType] = useState(permissions.type)

    const [checkboxs, setCheckboxs] = useState(permissions.permissions);

    useEffect(() => {
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //change checkbox when user clicked 
    const onchangeCheckbox = (e) => {

        let temp = [...checkboxs]

        let arr = temp.map(obj => {
            let [ key ] = Object.keys(obj) 

            if(key === e.target.name){
                obj[key] = !obj[key]
            }
            return obj
        })

        setCheckboxs(arr)
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        let resp = await axios.put(`http://localhost:5000/cinema/${details.id}`,
        {
            firstname,
            lastname,
            username,
            session: session,
            createdDate: new Date(),
            type: type,
            permissions: checkboxs
        })

        dispatch(setAllUsers(resp.data))       
        props.history.push("/manage")
    }

    return (
        <div>
            <h1>Edit User</h1>

            <form onSubmit={submitHandler}>
                
                First Name: <input type="text" value={firstname}  onChange={(e) => setFirstname(e.target.value)} /> <br/>
                Last Name:  <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} /> <br/>
                User Name:  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> <br/>
                Session time out(Minutes): <input type="text" value={session} onChange={(e) => setSession(e.target.value)}/> <br/>
                Type: <input type="text" value={type} onChange={(e) => setType(e.target.value)}/> <br/>

                Permissions: <br/>
               
                {
                    checkboxs?.map((item, i) => {
                        return <Checkbox key={i}
                            item={item}
                            change={onchangeCheckbox}
                        />
                    })
                }

                <input type="submit" value="Update"/>
                <input type="button" value="Cancel" onClick={() => props.history.goBack()}/>
            </form>
        </div>
    )
}

export default EditUser