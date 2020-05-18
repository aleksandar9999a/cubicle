const mainCotroller = require('./../controllers/main.controller');
const authCotroller = require('./../controllers/auth');
const { auth } = require('./../utils');

module.exports = (app) => {
    app.post('/create/accessory', auth(), mainCotroller.postAccessories);
    app.get('/create/accessory', auth(), mainCotroller.getAccessories);
    app.post('/attach/accessory/:id', auth(), mainCotroller.postAttachAccessory);
    app.get('/attach/accessory/:id', auth(), mainCotroller.getAttachAccessory);
    app.get('/details/:id', auth(false), mainCotroller.details);
    app.post('/create', auth(), mainCotroller.postCreate);
    app.get('/create', auth(), mainCotroller.getCreate);
    app.post('/edit/:id', auth(), mainCotroller.postEdit);
    app.get('/edit/:id', auth(), mainCotroller.getEdit);
    app.post('/delete/:id', auth(), mainCotroller.postDelete);
    app.get('/delete/:id', auth(), mainCotroller.getDelete);
    app.get('/about', auth(false), mainCotroller.about);
    app.post('/login', auth(false), authCotroller.postLogin);
    app.get('/login', auth(false), authCotroller.getLogin);
    app.post('/register', auth(false), authCotroller.postRegister);
    app.get('/register', auth(false), authCotroller.getRegister);
    app.get('/logout', authCotroller.logout);
    app.get('/404', auth(false), mainCotroller.notFound);
    app.post('/', auth(false), mainCotroller.postIndex);
    app.get('/', auth(false), mainCotroller.getIndex);
};