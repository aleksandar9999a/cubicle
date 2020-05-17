const path = require('path');

function getLogin(req, res, next) {
    res.render(path.resolve('./views/loginPage.hbs'));
}

function getRegister(req, res, next) {
    res.render(path.resolve('./views/registerPage.hbs'));
}

function postLogin(req, res, next) {
    
}

function postRegister(req, res, next) {
    
}



module.exports = {
    getLogin,
    getRegister,
    postLogin,
    postRegister
}