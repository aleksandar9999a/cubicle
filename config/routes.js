const mainCotroller = require('./../controllers/main.controller');

module.exports = (app) => {
    app.use('/details/:id', mainCotroller.details);
    app.use('/about', mainCotroller.about);
    app.use('/404', mainCotroller.notFound);
    app.post('/create', mainCotroller.postCreate);
    app.use('/create', mainCotroller.getCreate);
    app.use('/', mainCotroller.index);
};