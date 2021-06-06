import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setAllUsers } from '../redux/action'
import Checkbox from './Checkbox'

 const AddUserPage = (props) => {

    const dispatch = useDispatch()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [session, setSession] = useState('')
    const [type, setType] = useState('')

    const [checkboxs, setCheckboxs] = useState([
        {"View Subscriptions":false},
        {"Create Subscriptions":false},
        {"Delete Subscriptions":false},
        {"Update Subscriptions":false},
        {"View Movie":false},
        {"Create Movie":false},
        {"Delete Movie":false},
        {"Update Movie":false}
    ]);


    useEffect(() => {

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

        let resp = await axios.post("http://localhost:5000/cinema/add",
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

    // for (const index in checkboxs) {
        
    //     let obj = checkboxs[index]
    //     let key = Object.keys(obj)

    //     console.log(key)   
    // }
    
    return (
        <div>
            <h1>Add User</h1>

            <form onSubmit={submitHandler}>
                First Name: <input type="text"  onChange={(e) => setFirstname(e.target.value)} /> <br/>
                Last Name:  <input type="text"  onChange={(e) => setLastname(e.target.value)} /> <br/>
                User Name:  <input type="text"  onChange={(e) => setUsername(e.target.value)} /> <br/>
                Session time out(Minutes): <input type="text" onChange={(e) => setSession(e.target.value)}/> <br/>
                Type: <input type="text" onChange={(e) => setType(e.target.value)}/> <br/>

                Permissions: <br/>
               
                {
                    checkboxs.map((item, i) => {
                        return <Checkbox key={i}
                            item={item}
                            change={onchangeCheckbox}
                        />
                    })
                }

                <input type="submit" value="Save"/>
                <input type="button" value="Cancel" onClick={() => props.history.goBack()}/>
            </form>
        </div>
    )
}

export default AddUserPage