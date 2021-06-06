const express = require('express');
const router = express.Router();
const axios = require('axios');
const authUtils = require('../utils/authUtils');

router.post('/login', async (req,res) => {
    
    let username = req.body.username
    let password = req.body.password

    let user = await authUtils.authUser(username, password)

    res.json(user);
 })

module.exports = router;
