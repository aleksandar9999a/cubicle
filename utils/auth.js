const jwt = require('./jwt');
const appConfig = require('./../app-config');
const { userModel, blacklistModel } = require('./../models');

function auth(redirectUnauth = true) {
    return function (req, res, next) {
        const token = req.cookies[appConfig.authCookie] || '';
        Promise.all([jwt.verifyToken(token), blacklistModel.findOne({ token })])
            .then(([data, blacklistToken]) => {
                if (blacklistToken) {
                    return Promise.reject(new Error('Blacklisted token!'))
                }
                userModel.findById(data.id)
                    .then(user => {
                        req.user = user;
                        next()
                    })
            }).catch(err => {
                if (!redirectUnauth) {
                    next();
                    return;
                }

                if (['token expired', 'Blacklisted token!', 'jwt must be provided'].includes(err.message)) {
                    res.redirect('/login');
                    return;
                }
                next(err);
            });
    }
}



module.exports = auth;