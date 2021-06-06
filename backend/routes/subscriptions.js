const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

const subscriptionsBL = require('../BL/subscriptionsBL');
const db = require('../config/database');
const dbUtils = require('../utils/dbUtils');


//init DB with members and movies from WS's
router.get('/', async (req, res) => {

    //check if collections are empty, if they are insert data
    let memebersLength = await mongoose.connection.db.collection('members').countDocuments()
    let moviesLength = await mongoose.connection.db.collection('movies').countDocuments()

    if(memebersLength === 0 && moviesLength === 0){
        let data = await subscriptionsBL.insertRestDataToDB()
        console.log("Data was inserted to DB")
    }

    // let del = await subscriptionsBL.deleteMembersFromDB()
    // let del2 = await subscriptionsBL.deleteMoviesFromDB()

    res.json({status: "Done"});
})

router.get('/movies/:id', async (req,res) => {

    let id = req.params.id
    let movie = await subscriptionsBL.getMovieById(id)

    res.json({sub: id})
})

router.get('/members/:id', async (req,res) => {

    let id = req.params.id
    let member = await subscriptionsBL.getMemberById(id)    

    res.json({sub: "id"})
})


router.post('/movies/insert', async (req,res) => {

    let data = req.body
    let resp = await subscriptionsBL.insertNewMovie(data)
    let msg = !resp ? "New Movie added" : "Movie already exist"

    res.json({sub: msg})
})

router.post('/members/insert', async (req,res) => {

    let data = req.body
    let resp = await subscriptionsBL.insertNewMember(data)
    let msg = !resp ? "New Member added" : "Member already exist"

    res.json({sub: msg})
})

router.put('/members/update/:id', async (req,res) => {

    let data = req.body
    let id = req.params.id
    await subscriptionsBL.updateMemberById(id,data)

    res.json({sub: "update"})
})


router.put('/movies/update/:id', async (req,res) => {

    let data = req.body
    let id = req.params.id
    await subscriptionsBL.updateMovieById(id,data)

    res.json({sub: "update"})
})


router.delete('/members/delete/:id', async (req,res) => {

    let id = req.params.id
    console.log(id)
    await subscriptionsBL.deleteMemberById(id)

    res.json({sub: "Delete"})
})

router.delete('/movies/delete/:id', async (req,res) => {

    let id = req.params.id
    await subscriptionsBL.deleteMovieById(id)

    res.json({sub: "Delete"})
})

router.get("/getSubs", async (req, res) => {

    let data = await subscriptionsBL.getAllSubscriptions()
    // console.log(data)
    res.json(data)
})

router.post("/newSubs", async (req, res) => {

    let memberId = req.body.memberId
    let movieId = req.body.movieId
    let date = req.body.date

    let data = await subscriptionsBL.insertSubscriptionToDB(memberId,movieId,date)
    res.json({res: "newSub"})
})

module.exports = router;
