const mongoose = require('mongoose');

const Users = mongoose.Schema({
    username: String,
    password: String
})

module.exports = Users