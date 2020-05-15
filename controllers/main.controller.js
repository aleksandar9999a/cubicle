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
        res.render(path.resolve('./views/details.hbs'), { cube });
    }).catch(next);
}

module.exports = {
    index,
    details
};