const fs = require('fs')
const jsonUsers = require('../users.json')


const readUsersJson = async () => {

    return new Promise(resolve => {

        fs.readFile('./users.json', (err, data) => {
            let users = JSON.parse(data)
            
            resolve(users)
        })
    })
}

const readPermissionsJson = async () => {

    return new Promise(resolve => {

       fs.readFile('./permissions.json', (err, data) => {
            let per = JSON.parse(data)
            
            resolve(per)
        })
    })
    
}

const addUserToUsersJson = (data) => {

    fs.writeFile('./users.json', JSON.stringify(data) , (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const addPermissionsToPermissionsJson = (data) => {

    fs.writeFile('./permissions.json', JSON.stringify(data) , (err) => {
        if (err) {
            console.log(err)
        }
    })
}


module.exports = {
    readUsersJson,
    readPermissionsJson,
    addUserToUsersJson,
    addPermissionsToPermissionsJson
}