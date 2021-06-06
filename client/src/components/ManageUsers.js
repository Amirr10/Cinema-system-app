import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import User from './User'
import AddUserPage from './AddUserPage'
import { setUser, setAllUsers } from '../redux/action'


const ManageUsers = (props) => {

    const dispatch = useDispatch()

    const { users } = useSelector(state => state.getAllUsers)
    const [showUsers, setShowUsers] = useState(false)

    useEffect(() => {

        //fetch all users
        const getUsersData = async () => {
            let resp = await axios.get("http://localhost:5000/cinema/")

            dispatch(setAllUsers(resp.data))
        }
        getUsersData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        console.log(users,"useEffect Manage users")
    }, [users])


    const deleteUser = async (id) => {

        let resp = await axios.delete(`http://localhost:5000/cinema/${id}`)

        //update list of users after user been deleted
        dispatch(setAllUsers(resp.data))       
    }

    const editUser = async (id) => {
        
        //get data and store all user details and permissions in redux store
        let resp = await axios.get(`http://localhost:5000/cinema/${id}`)
        dispatch(setUser(resp.data))

        props.history.push("/edit")
    }


    return (
        <div>
            <h1>Users</h1>

            <form action="">
                <input type="button" value="All Users" onClick={() => setShowUsers(curr => !curr)} /> {" "}
                <input type="button" value="Add User" onClick={() => props.history.push("/addUser")} />
            </form>


            {/* {showUsers ?
                <> */}
                    { showUsers ?
                        users && users.map((user, i) => {
                            return <User key={i}
                                id={user.id}
                                name={user.name}
                                username={user.username}
                                session={user.session}
                                permissions={user?.permissions}
                                delete={deleteUser}
                                edit={editUser}
                                history={props.history}
                            />
                        })
                    : 
                    null
                    }

                {/* </> */}
                 {/* <AddUserPage {...props} /> */}
            {/* } */}

        </div>
    )
}

export default ManageUsers
