const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
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
    cubes: [
        { 
            type: mongoose.Types.ObjectId ,
            ref: 'Cubes'
        }
    ]
});

module.exports = mongoose.model('Accessories', accessoriesSchema);