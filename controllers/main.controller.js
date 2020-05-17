const path = require('path');
const cubeModel = require('./../models/cube');
const accessoriesModel = require('./../models/accessories');

function getIndex(req, res, next) {
    cubeModel.find().then(cubes => {
        res.render(path.resolve('./views/index.hbs'), { cubes });
    }).catch(next);
}

function postIndex(req, res, next) {
    let { search, from, to } = req.body;
    from === '' ? from = 0 : Number(from);
    to === '' ? to = 6 : Number(to);

    cubeModel.find().where('name').equals(search).where('difficulty').gt(from).lt(to).then(cubes => {
        res.render(path.resolve('./views/index.hbs'), { cubes });
    }).catch(next);
}

function details(req, res, next) {
    const id = req.params.id;
    cubeModel.findById(id).then(cube => {
        if (!cube) {
            res.redirect('/404');
            return;
        }
        res.render(path.resolve('./views/details.hbs'), { cube });
    }).catch(next);
}

function notFound(req, res, next) {
    res.render(path.resolve('./views/404.hbs'));
}

function getCreate(req, res, next) {
    res.render(path.resolve('./views/create.hbs'));
}

function postCreate(req, res, next) {
    const { name = null, image = null, desc = null, difficulty = null } = req.body;
    cubeModel.create({ name, image, desc, difficulty }).then(cube => {
        res.redirect('/');
    });
}

function getAccessories(req, res, next) {
    res.render(path.resolve('./views/createAccessory.hbs'));
}

function postAccessories(req, res, next) {
    const { name = null, image = null, desc = null } = req.body;
    accessoriesModel.create({ name, image, desc }).then(() => {
        res.redirect('/');
    });
}

function about(req, res, next) {
    res.render(path.resolve('./views/about.hbs'));
}

module.exports = {
    getIndex,
    postIndex,
    details,
    notFound,
    about,
    postCreate,
    getCreate,
    postAccessories,
    getAccessories
};