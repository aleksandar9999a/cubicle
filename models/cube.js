const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    difficulty: Number
});

module.exports = mongoose.model('Cubes', modelSchema);