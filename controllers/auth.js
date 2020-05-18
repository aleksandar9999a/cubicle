const path = require('path');
const { userModel, blacklistModel } = require('../models');
const utils = require('./../utils');
const appConfig = require('./../app-config');

function getLogin(req, res, next) {
    res.render(path.resolve('./views/loginPage.hbs'));
}

function getRegister(req, res, next) {
    res.render(path.resolve('./views/registerPage.hbs'));
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.render(path.resolve('./views/loginPage.hbs'), { errors: { message: 'Wrong password or username!' } });
                return;
            }

            const token = utils.jwt.createToken({id: user.id});
            res.cookie(appConfig.authCookie, token).redirect('/');
        })
        .catch(next)
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

    userModel.create({ username, password })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            if (err.code === 11000) {
                res.render(
                    path.resolve('./views/registerPage.hbs'),
                    { errors: { username: 'Username already exist!' } }
                );
                return;
            }
            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[appConfig.authCookie];
    
    blacklistModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookie).redirect('/');
    })
}

module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    logout
}