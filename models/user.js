const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});

userSchema.methods = {
    matchPassword: function(password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds)
            .then(salt => {
                return bcrypt.hash(this.password, salt);
            }).then(hash => {
                this.password = hash;
                next();
            }).catch(next);
        return;
    }
    next();
})

module.exports = mongoose.model('Users', userSchema);