const mainCotroller = require('./../controllers/main.controller');
const authCotroller = require('./../controllers/auth');
const { auth } = require('./../utils');

module.exports = (app) => {
    app.post('/create/accessory', mainCotroller.postAccessories);
    app.get('/create/accessory', mainCotroller.getAccessories);
    app.post('/attach/accessory/:id', mainCotroller.postAttachAccessory);
    app.get('/attach/accessory/:id', mainCotroller.getAttachAccessory);
    app.get('/details/:id', mainCotroller.details);
    app.post('/create', auth, mainCotroller.postCreate);
    app.get('/create', auth, mainCotroller.getCreate);
    app.get('/about', mainCotroller.about);
    app.post('/login', authCotroller.postLogin);
    app.get('/login', authCotroller.getLogin);
    app.post('/register', authCotroller.postRegister);
    app.get('/register', authCotroller.getRegister);
    app.get('/logout', authCotroller.logout);
    app.use('/404', mainCotroller.notFound);
    app.post('/', mainCotroller.postIndex);
    app.get('/', mainCotroller.getIndex);
};