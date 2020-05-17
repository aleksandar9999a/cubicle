const mainCotroller = require('./../controllers/main.controller');

module.exports = (app) => {
    app.post('/create/accessory', mainCotroller.postAccessories);
    app.use('/create/accessory', mainCotroller.getAccessories);
    app.post('/attach/accessory/:id', mainCotroller.postAttachAccessory);
    app.get('/attach/accessory/:id', mainCotroller.getAttachAccessory);
    app.use('/details/:id', mainCotroller.details);
    app.post('/create', mainCotroller.postCreate);
    app.use('/create', mainCotroller.getCreate);
    app.use('/about', mainCotroller.about);
    app.use('/404', mainCotroller.notFound);
    app.post('/', mainCotroller.postIndex);
    app.use('/', mainCotroller.getIndex);
};