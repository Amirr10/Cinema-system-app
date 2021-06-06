const Members = require('../models/Members');
const Movies = require('../models/Movies');
const Subscritions = require('../models/Subscritions');
const db = require('../config/database')


// ***** Subscritions DB *****

const getMember = async (id) => {
    let member = await db.Members.findById(id)
    return member
}

const getMovie = async (id) => {
    let movie = await db.Movies.findById(id)
    return movie
}

const memberExistById = (id) => {

    return new Promise(resolve => {
        //check if movie exists in db
        db.Members.findById(id, (err,doc) => {
            // console.log(doc,'doc')
            if(doc !== undefined){
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })

}

const movieExistById = (id) => {

    db.Movies.findById(id, (err,doc) => {
        // console.log(doc,'doc')
        if(doc !== undefined){
            resolve(true)
        } else {
            resolve(false)
        }
    })
  
}

const subcriptionExistByMemberId = (id) => {

    return new Promise(resolve => {
        //check if sub exists in db
        db.Subscritions.find({memberId:id} , (err,doc) => {
            // console.log(doc,'doc')
            if(doc.length === 0){
                resolve(doc)
            } else {
                resolve(doc)
            }
        })
    })

}

const insertNewSubscription = (obj) => {
    db.Subscritions.create(obj)
}

const getSubscriptions = async () => {
    return db.Subscritions.find({})
}


// ***** Users DB *****

const userExistByUsername = async (username) => {

    let userData = await db.Users.find({"username":username})
    let userBool = userData.length > 0 ? true : false

    return userBool
}

const createUser = async (username) => {
    let user = await db.Users.create({"username":username, "password": ""})
    return user
}

const deleteUser = async (id) => {
    await db.Users.deleteOne({_id: id})
}

const updateUsernameById = async (id, username) => {
    await db.Users.findOneAndUpdate({_id: id}, {username: username})
}


module.exports = {
    getMember,
    getMovie,
    getSubscriptions,
    memberExistById,
    movieExistById,
    subcriptionExistByMemberId,
    insertNewSubscription,

    userExistByUsername,
    createUser,
    deleteUser,
    updateUsernameById
}