const usersDal = require('../DALS/usersDAL');
const subscriptionsDal = require('../DALS/subscritionsDAL')
const subscriptionsBL = require('./subscriptionsBL');
const subscritionsDAL = require('../DALS/subscritionsDAL');
const db = require('../config/database')
const jwt = require('jsonwebtoken');
const authUtils = require('../utils/authUtils');
const dbUtils = require('../utils/dbUtils');


const validateUserAndPassword = async (username, password) => {

    let user = await db.Users.find({username: username, password: password})
    let [ userObj ] = user

    let newUser = {
        auth: user.length === 0 ? false : true,
        user: userObj
    }

    return newUser
}


const getUserDetailsById = async (id) => {

    //get username from db
    let [ dbUser ] = await db.Users.find({_id:id})
    let username = dbUser.username

    //get user details
    let { users } = await usersDal.readUsersJson()
    let userDetails = users.find(user => user.id === id)

    //get user permissions
    let permObj = await usersDal.readPermissionsJson()
    let userPermissions = permObj.permissions.find(user => user.id === id)

    return [userDetails, userPermissions, username]
}

const getUsersAndPermissions = async () => {

    let dbUsers = await db.Users.find({})
    let { users } = await usersDal.readUsersJson()
    let { permissions } = await usersDal.readPermissionsJson()
    
    let shapedUsers = users.map(user => {

       let newUser = {}

       let tempDbUser =  dbUsers.find(dbUser => dbUser.id === user.id)
       let tempPerm =  permissions.find(perm => perm.id === user.id)

       newUser.id = user.id
       newUser.name = user.firstName + " " + user.lastName 
       newUser.username = tempDbUser.username 
       newUser.session = user.sessionTimeout
       newUser.createdData = user.createdData
       newUser.permissions = tempPerm.permissions


       return newUser
    })

    return shapedUsers
}


//create new user in db, users.json, permissions.json
const addNewUser = async (data) => {

    //1. get username and check if exist in db
    let userExist = await dbUtils.userExistByUsername(data.username)
    if(userExist) return "Username already exist"
    
    //save in db 
    let userDb = await dbUtils.createUser(data.username)

    //2. get data and save in users.json
    // id, firstName, lastName, createdDate, sessionTimeout
    let userJsonObj = {}
    userJsonObj.id = userDb._id
    userJsonObj.firstName = data.firstname
    userJsonObj.lastName = data.lastname
    userJsonObj.createdDate = data.createdDate
    userJsonObj.sessionTimeout = data.session

    //read all users.json and push it to the end of the array and write to the file
    let usersJson = await usersDal.readUsersJson()
    let tempArr = [...usersJson.users]

    tempArr.push(userJsonObj)
    let fileObj = {users: tempArr}
    
    // save in users.json file
    await usersDal.addUserToUsersJson(fileObj)

    //3. get data and save in permissions.json
    // id, type, permissions
    let permissionsJsonObj = {}
    permissionsJsonObj.id = userDb._id
    permissionsJsonObj.type = data.type
    permissionsJsonObj.permissions = data.permissions

    let permissionsJson = await usersDal.readPermissionsJson()
    let tempPermArr = [...permissionsJson.permissions]

    tempPermArr.push(permissionsJsonObj)
    let filePermObj = {permissions: tempPermArr}

    // save in permission.json file
    await usersDal.addPermissionsToPermissionsJson(filePermObj)

    // return "User was created successfully"
    return await getUsersAndPermissions()
}


const deleteUserById = async (id) => {

    //delete from db
    await dbUtils.deleteUser(id)

    //delete from users.json
    let usersJson = await usersDal.readUsersJson()
    let tempArr = [...usersJson.users]

    let filteredUsers = tempArr.filter(user => user.id !== id)
    let fileObj = {users: filteredUsers}
    
    // save in users.json file
    await usersDal.addUserToUsersJson(fileObj)

    //delete from perm.json
    let permissionsJson = await usersDal.readPermissionsJson()
    let tempPermArr = [...permissionsJson.permissions]

    let filteredPerm = tempPermArr.filter(perm => perm.id !== id)
    let filePermObj = {permissions: filteredPerm}

    // save in permission.json file
    await usersDal.addPermissionsToPermissionsJson(filePermObj)

    //return the updated users list
    let users = await getUsersAndPermissions()
    return users
}


const editUserById = async (id, obj) => {

    //get all user data
    let data = await getUserDetailsById(id)

    // 1. update data in db
    let username = obj.username
    await dbUtils.updateUsernameById(id, username)

    // 2. update data in user.json
    let firstname = obj.firstname
    let lastname = obj.lastname
    let session = obj.session

    //get the index of the user from list of users.json and update
    let usersJsonFile = await usersDal.readUsersJson()
    let userIndex = usersJsonFile.users.findIndex(user => user.id === id)

    usersJsonFile.users[userIndex].firstName = firstname
    usersJsonFile.users[userIndex].lastName = lastname
    usersJsonFile.users[userIndex].sessionTimeout = session

    //update file
    await usersDal.addUserToUsersJson(usersJsonFile)
    
    // 3. update data in perm.json
    let type = obj.type
    let permission = obj.permissions

    let permissionsJsonFile = await usersDal.readPermissionsJson()
    let permIndex = permissionsJsonFile.permissions.findIndex(user => user.id === id)

    permissionsJsonFile.permissions[permIndex].type = type
    permissionsJsonFile.permissions[permIndex].permissions = permission
    await usersDal.addPermissionsToPermissionsJson(permissionsJsonFile)

    return "User updated succesfully"
}


//***** Subscritions actions *****//


const subscribeMovie = async (data) => {

    await subscriptionsDal.sendData(data)
}

const getSubscribers = async () => {
    let subs = await subscritionsDAL.getAllSubs()
    return subs
}

module.exports = {
    getUserDetailsById,
    validateUserAndPassword,
    getUsersAndPermissions,
    addNewUser,
    deleteUserById,
    editUserById,

    subscribeMovie,
    getSubscribers
}