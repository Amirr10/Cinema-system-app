import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import { saveToken } from '../utils/authUtils'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setUser, setAllUsers } from '../redux/action'

const Login = (props) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState(false)


    useEffect(() => {

        //fetch all users
        const getUsersData = async () => {
            let resp = await axios.get("http://localhost:5000/cinema/")
            dispatch(setAllUsers(resp.data))
        }
        getUsersData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const login = async () => {

        let resp = await axios.post('http://localhost:5000/auth/login', {username, password})
        let data = resp.data

        if(data.auth){
            saveToken(data.token)
            sessionStorage["userId"] = data.user._id

            //get users details from users.json and permission in from WS
            let user = await axios.get(`http://localhost:5000/cinema/${data.user._id}`)
        
            dispatch(setUser(user.data))

            props.history.push("/main")
        } else {
            setErrMsg(true)
        }
    }

    return (
        <div>
            <h1>Movies - Subscription Website</h1>
            <h3>Login Page</h3>

            Username: <input type="text" onChange={usernameHandler} /> <br />
            Password: <input type="text" onChange={passwordHandler} /> <br />

            <input type="button" value="Login" onClick={login} /> <br /> 
            {errMsg ? 'Wrong Username or Password': ''} <br /> <br />

            New User ? <Link to="/createAccount">Create Account</Link>

        </div>
    )
}

export default Login