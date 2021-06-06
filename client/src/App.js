import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import { getToken } from './utils/authUtils'
import Login from './components/Login'
import Main from './components/Main'
import CreateAccount from './components/CreateAccount'
import Subscriptions from './components/Subscription'
import ManageUsers from './components/ManageUsers'
import AddUserPage from './components/AddUserPage';
import EditUser from './components/EditUser'
import ProtectedRoute from './ProtectedRoute';


function App(props) {

  axios.interceptors.request.use(async req => {

    req.headers = { 'x-access-token': getToken() }

    return req
  })

  axios.interceptors.response.use(undefined, (err) => {

    if (err.response.status === 401) {
        alert("Session Expired")
        window.location.href = "/"
    }
  })


  return (
    
    <div className="App">
     
     <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/createAccount" component={CreateAccount} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/manage" component={ManageUsers} />
      <Route path="/addUser" component={AddUserPage} />
      <Route path="/edit" component={EditUser} />


    </Switch>

    </div>
    
  );
}

export default App;
