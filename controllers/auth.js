const path = require('path');
const { userModel } = require('../models');

function getLogin(req, res, next) {
    res.render(path.resolve('./views/loginPage.hbs'));
}

function getRegister(req, res, next) {
    res.render(path.resolve('./views/registerPage.hbs'));
}

function postLogin(req, res, next) {

}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render(
            path.resolve('./views/registerPage.hbs'),
            { errors: { repeatPassword: 'Two password are not match!' } }
        );
        return;
    }

    userModel.findOne({ username }).then(user => {
        if (user) {
            res.render(
                path.resolve('./views/registerPage.hbs'),
                { errors: { username: 'Username already exist!' } }
            );
            return;
        }

        return userModel.create({ username, password })
    })
    .then(() => {
        res.redirect('/login');
    })
    .catch(next);
}



module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister
}