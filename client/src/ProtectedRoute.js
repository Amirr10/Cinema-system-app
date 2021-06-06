import React from 'react'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest}) => {

    return (
        <Route {...rest} render={() => {
            return children
        }}

        />
    )
}

export default ProtectedRoute