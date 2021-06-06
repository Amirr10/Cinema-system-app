const membersDal = require('../DALS/membersDAL');
const moviesDal = require('../DALS/moviesDAL');
const mongoose = require('mongoose');
const Members = require('../models/Members');
const Movies = require('../models/Movies');
const Subscritions = require('../models/Subscritions');
const usersDAL = require('../DALS/usersDAL');
const subscriptionsDal = require('../DALS/subscritionsDAL')
const dbUtils = require('../utils/dbUtils');
const db = require('../config/database')


const getMemberById = async (id) => {
    let member = await dbUtils.getMember(id)
}

const getMovieById = async (id) => {
    let movie = await dbUtils.getMovie(id)
}

//get all members & movies and insert them to db collections
const insertRestDataToDB = async () => {

    await insertMembersToSubsDB()
    await insertMoviesToSubsDB()
}

//helper function to insert members when app init
const insertMembersToSubsDB = async () => {

    //get all members and insert them to db
    let allMembers = await membersDal.getAllMembers()

    let membersArr = allMembers.map(user => {
        let obj = {}
        obj.Name = user.name
        obj.Email = user.email
        obj.City = user.address.city

        return obj
    })

    db.Members.insertMany(membersArr, (err, doc) => {
        if (err) {
            return err
        }
    })
}

//helper function to insert movies when app init
const insertMoviesToSubsDB = async () => {

    //get all movies and insert them to db
    let allMovies = await moviesDal.getAllMovies()

    let moviesArr = allMovies.map(movie => {
        let obj = {}
        obj.name = movie.name
        obj.genres = movie.genres
        obj.image = movie.image
        obj.premiered = movie.premiered

        return obj
    })

    db.Movies.insertMany(moviesArr, (err, doc) => {
        if (err) {
            return err
        }
    })
}

//insert new movie to Movies Collection
const insertNewMovie = async (obj) => {

    let name = obj.name

    return new Promise(resolve => {
        //check if movie exists in db
        db.Movies.find({ name: name }, (err, doc) => {
            if (doc.length === 0) {
                moviesDal.insertMovie(obj)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })

}

//insert new member to Members Collection
const insertNewMember = (obj) => {

    let name = obj.Name

    return new Promise(resolve => {
        //check if movie exists in db
        db.Members.find({ Name: name }, (err, doc) => {
            if (doc.length === 0) {
                membersDal.insertMember(obj)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

const deleteMemberById = (id) => {
    membersDal.deleteMember(id)
}

const deleteMovieById = (id) => {
    moviesDal.deleteMovie(id)
}

const updateMemberById = async (id, newMember) => {
    await membersDal.updateMember(id, newMember)
}

const updateMovieById = async (id, newMovie) => {
    await moviesDal.updateMovie(id, newMovie)
}

const deleteMembersFromDB = () => {
    membersDal.deleteAllMembers()
}

const deleteMoviesFromDB = () => {
    moviesDal.deleteAllMovies()
}

const getAllSubscriptions = async () => {
    let subs = await dbUtils.getSubscriptions()
    return subs
}

const insertSubscriptionToDB = async (memberId, movieId, date) => {

    //check if memberId exists inside subscriptions db
    let memberSub = await dbUtils.subcriptionExistByMemberId(memberId)

    if (memberSub.length === 0) {

        //insert new member to subscriptions table
        let subObj = {
            memberId,
            movies: [{ movieId, date }]
        }
        await dbUtils.insertNewSubscription(subObj)

        //if member already exists in subscriptions table,
        //check if a member didn't subscribe to the movie yet.
    } else {

        //get movies array of the member
        const [obj] = memberSub

        // check if movie exist by movies array by id
        let checkMovieExist = obj.movies.find(movie => movie.movieId === movieId)

        if (checkMovieExist === undefined) {

            let newMovie = {
                movieId: movieId,
                date: new Date()
            }

            // save/update subscription in db
            obj.movies.push(newMovie)
            obj.save()
        }
    }
}

module.exports = {
    getMemberById,
    getMovieById,
    insertRestDataToDB,
    deleteMembersFromDB,
    deleteMoviesFromDB,
    insertSubscriptionToDB,
    insertNewMovie,
    insertNewMember,
    deleteMemberById,
    deleteMovieById,
    updateMemberById,
    updateMovieById,
    getAllSubscriptions
}