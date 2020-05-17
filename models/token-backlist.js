const mongoose = require('mongoose');

const tokenBacklist = new mongoose.Schema({
    token: String
});

module.exports = mongoose.model('TokenBacklist', tokenBacklist);