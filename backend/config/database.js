const mongoose = require('mongoose');
const members = require('../models/Members');
const movies = require('../models/Movies');
const subscritions = require('../models/Subscritions');
const users = require('../models/Users');

let db = mongoose.createConnection(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

let db2 = db.useDb('usersDB');

let Members = db.model('members', members);
let Movies = db.model('movies', movies);
let Subscritions = db.model('subscriptions', subscritions);

let Users = db2.model('users', users);

module.exports = {
    Members,
    Movies,
    Subscritions,
    Users
}

