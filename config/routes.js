const mainCotroller = require('./../controllers/main.controller');
const authCotroller = require('./../controllers/auth');

module.exports = (app) => {
    app.post('/create/accessory', mainCotroller.postAccessories);
    app.get('/create/accessory', mainCotroller.getAccessories);
    app.post('/attach/accessory/:id', mainCotroller.postAttachAccessory);
    app.get('/attach/accessory/:id', mainCotroller.getAttachAccessory);
    app.get('/details/:id', mainCotroller.details);
    app.post('/create', mainCotroller.postCreate);
    app.get('/create', mainCotroller.getCreate);
    app.get('/about', mainCotroller.about);
    app.get('/login', authCotroller.getLogin);
    app.get('/register', authCotroller.getRegister);
    app.use('/404', mainCotroller.notFound);
    app.post('/', mainCotroller.postIndex);
    app.get('/', mainCotroller.getIndex);
};