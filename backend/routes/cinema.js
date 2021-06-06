const express = require('express');
const router = express.Router();
const axios = require('axios');
const cinemaBL = require('../BL/cinemaBL');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = require('../config/database');
const authUtils = require('../utils/authUtils');
const { verifyToken } = require('../utils/authUtils');


//*** Cinema API calls ***/

//get all users and permissions data
router.get('/', async (req,res) => {
    
   let data = await cinemaBL.getUsersAndPermissions()

    res.json(data);
})

//get user details and permissions by id
router.get('/:id', async (req,res) => {
    
    let id = req.params.id
    let [userDetails, userPermissions, username] = await cinemaBL.getUserDetailsById(id)
     
    res.json({details: userDetails, permissions: userPermissions, username});
 })

 //create new user and update files and DB(Only admin can)
router.post('/add', async (req,res) => {
    
    let data = req.body
    let users = await cinemaBL.addNewUser(data)
    // console.log(users)

     res.json(users);
 })

 //delete user from users.json, DB and permissions.json
router.delete('/:id', async (req,res) => {
    
    let id = req.params.id
    let data =  await cinemaBL.deleteUserById(id)
     
     res.json(data);
 })

 //update user details and permissions by id
 router.put('/:id', async (req,res) => {
    
    let id = req.params.id
    let obj = req.body

    let msg =  await cinemaBL.editUserById(id, obj)
     
     res.json({msg});
 })


//*** requests for Subscriptions api  ***/ 

 //get all subscriptions
router.post('/allSubs', async (req,res) => {
    
    let userId = req.body.userId
    let token = req.body.token
    
    if(req.authToken){
        let subs = await cinemaBL.getSubscribers()
        console.log(subs)
        res.status(200).json(subs)
    } 
 })

//subscribe to a new movie
router.post('/subscribe', async (req,res) => {
    
    let data = req.body
    let users = await cinemaBL.subscribeMovie(data)
 
     res.json({cinema:"city"});
 })

module.exports = router;