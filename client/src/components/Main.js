import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Main(props) {

    const { user } = useSelector(state => state.getUser)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        //if user not authenticated redirect to login page from interceptor
        // axios.post('http://localhost:5000/cinema', {})
    }, [])

    const navigate = () => {
        props.history.push("/subscriptions")
    }

    const managePage = () => {
        props.history.push("/manage")
    }

    const checkToken = async () => {

        let userId = sessionStorage["userId"]
        let token = sessionStorage["token"]

        try {
            let resp = await axios.post('http://localhost:5000/cinema/allSubs', { userId, token })
            setShowMenu(false)
            console.log(resp?.data)

        } catch (err) {

            setShowMenu(true)
            props.history.push("/")
        }
    }

    return (
        <div>
            <h1>Movies - Subscription Website</h1>

            {!showMenu ?
                <>
                    <input type="button" value="Movies" />
                    <input type="button" value="Subscription" onClick={navigate} />

                    {
                        user?.permissions.type === "Admin" ?
                            <input type="button" value="User Management" onClick={managePage} />
                            : ""
                    }

                    <input type="button" value="Logout" /> <br />
                    <Link to="/">Back</Link>

                    {/* <input type="button" value="Check Token" onClick={checkToken} /> <br /> */}
                </>
                : null
            }

        </div>
    )
}
