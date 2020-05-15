const path = require('path');
const cubeModel = require('./../models/cube');

function index(req, res, next) {
    cubeModel.getAll().then(cubes => {
        res.render(path.resolve('./views/index.hbs'), { cubes });
    }).catch(next);
}

function details(req, res, next) {
    const id = Number(req.params.id);
    cubeModel.getOne(id).then(cube => {
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
    const newCube = cubeModel.create(name, image, desc, difficulty);
    cubeModel.insert(newCube).then(cube => {
        res.redirect('/');
    })
}

function about(req, res, next) {
    res.render(path.resolve('./views/about.hbs'));
}

module.exports = {
    index,
    details,
    notFound,
    about,
    postCreate,
    getCreate
};