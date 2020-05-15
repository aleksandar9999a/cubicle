const mainCotroller = require('./../controllers/main.controller');

module.exports = (app) => {
    app.use('/404', mainCotroller.notFound);
    app.use('/about', mainCotroller.about);
    app.use('/create', mainCotroller.create);
    app.use('/details/:id', mainCotroller.details);
    app.use('/', mainCotroller.index);
};