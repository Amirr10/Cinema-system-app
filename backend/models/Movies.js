const mongoose = require('mongoose');

const Movies = mongoose.Schema({
    name: String,
    genres: [String],
    image: {
        medium: String,
        original: String
    },
    premiered: Date
})

module.exports = Movies
// module.exports = mongoose.model("movies", Movies);