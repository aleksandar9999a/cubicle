const mainCotroller = require('./../controllers/main.controller');

module.exports = (app) => {
    app.use('/details/:id', mainCotroller.details);
    app.use('/', mainCotroller.index);
};