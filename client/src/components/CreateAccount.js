import React from 'react'

export default function CreateAccount(props) {

    const createAccount = () => {

        props.history.push("/")
    }

    return (
        <div>
            <h1>Movies - Subscription Website</h1>
            <h3>Create an Account</h3>

            Username: <input type="text"/> <br />
            Password: <input type="text"/> <br />
            <input type="button" value="Create" onClick={createAccount}  /> <br /> <br />

        </div>
    )
}
