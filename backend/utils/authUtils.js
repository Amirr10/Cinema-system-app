const jwt = require('jsonwebtoken');
const db = require('../config/database')

//validate user and creates a token
const authUser = async (username, password) => {

    let user = await validateUserAndPassword(username, password)

    if(user.auth){ 
       let token = await createToken(user)
       return token
    }
}


const validateUserAndPassword = async (username, password) => {

    let user = await db.Users.find({username: username, password: password})
    let [ userObj ] = user

    let newUser = {
        auth: user.length === 0 ? false : true,
        user: userObj
    }
    return newUser
}


const getToken = () => {
    let token = req.headers["x-access-token"]
    return token
}

//create new JWT 
const createToken = (user) => {

    if(user.auth){
        const userId = user.user._id
        const RSA_KEY = process.env.SECRET_KEY

        let token = jwt.sign({userId: userId}, RSA_KEY, {expiresIn:10})

        user.token = token
    }
    return user
}


const verifyToken = (req,res,next) => {

    let token = req.headers["x-access-token"]
    if(!token) return res.status(401).send("Missing Token") 

    jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {

        if(err){
            req.authToken = false
            res.status(401).send("Unauthorized")
        } else {
            req.authToken = true
            next()
        }
    })
}

module.exports = {
    authUser,
    getToken,
    verifyToken
}