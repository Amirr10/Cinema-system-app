const mongoose = require('mongoose');

const Subscriptions = mongoose.Schema({
    memberId: String,
    movies: [ { movieId: String, date: Date } ]
})

module.exports = Subscriptions
// module.exports = mongoose.model("subscriptions", Subscriptions);