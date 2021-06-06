
const axios = require('axios');
const mongoose = require('mongoose');
const Movies = require('../models/Movies');
const db = require('../config/database')


const getMovieById = async (id) => {

    let resp = await axios.get("https://jsonplaceholder.typicode.com/users/id")
    let data = resp.data

    return data
}

const getAllMovies = async () => {

        let resp = await axios.get("https://api.tvmaze.com/shows")
        let data = resp.data

        return data
}

const deleteAllMovies = () => {

    db.Movies.deleteMany({}, (err) => {
        if(err){
            return err
        }
    })
}

const insertMovie = (obj) => {

    //insert to db
    db.Movies.create(obj)
}

const deleteMovie = (id) => {

    //insert to db
    db.Movies.deleteOne({_id:id}, (doc) => {
        console.log(doc,'doc')
    })
}

const updateMovie = (id, newMovie) => {
    db.Movies.updateOne({_id:id}, newMovie, (err, res) => {
        if(err){
            console.log(err)
        } else {
            console.log(res, "Updated")
        }
    })
}

module.exports = {
    getAllMovies,
    deleteAllMovies,
    insertMovie,
    deleteMovie,
    updateMovie
}