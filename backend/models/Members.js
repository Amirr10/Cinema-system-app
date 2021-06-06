const mongoose = require('mongoose');

const Members = mongoose.Schema({
    Name: String,
    Email: String,
    City: String
})

module.exports = Members
// module.exports = mongoose.model("members", Members);