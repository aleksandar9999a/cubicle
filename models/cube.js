const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        maxlength: 300
    },
    image: {
        type: String
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [
        { 
            type: mongoose.Types.ObjectId ,
            ref: 'Accessories'
        }
    ]
});

module.exports = mongoose.model('Cubes', cubeSchema);