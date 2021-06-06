const axios = require('axios');
const mongoose = require('mongoose');
const Members = require('../models/Members');
const db = require('../config/database')


const getMemberById = async (id) => {

    // let resp = await axios.get(`http://localhost:5000/sub/newSub/${id}`)
    // let data = resp.data

    // return data
}

const getAllMembers = async () => {

        let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
        let data = resp.data

        return data
}

const deleteAllMembers = () => {

    db.Members.deleteMany({}, (err) => {
        if(err){
            return err
        }
    })
}

const insertMember = (obj) => {

    //insert to db
    db.Members.create(obj)
}

const deleteMember = (id) => {

    //insert to db
    db.Members.deleteOne({_id:id}, (doc) => {
        console.log(doc,'doc')
    })
}

const updateMember = (id, newMember) => {
    db.Members.updateOne({_id:id}, newMember, (err, res) => {
        if(err){
            console.log(err)
        } else {
            console.log(res, "Updated")
        }
    })
}

module.exports = {
    getMemberById,
    getAllMembers,
    deleteAllMembers,
    insertMember,
    deleteMember,
    updateMember
}
