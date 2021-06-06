const axios = require('axios');
const mongoose = require('mongoose');
const Members = require('../models/Members');
const db = require('../config/database')

const sendData = async (data) => {

    let resp = await axios.post("http://localhost:5000/sub/insert", {data})
    let respData = resp.data
    console.log(respData, 'from DAL')

    return respData
}

const getMemberById = async (id) => {

    // let resp = await axios.get(`http://localhost:5000/sub/newSub/${id}`)
    // let data = resp.data
    db.Members.findById(id, (err,doc) => {
        console.log(doc)
    })
    // return data
}

const getAllSubs = async () => {
    let resp = await axios.get(`http://localhost:5000/sub/getSubs`)
    return resp.data
}

module.exports = {
    sendData,
    getAllSubs
}