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
    cubeModel.findById(id).populate('accessories').then(cube => {
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
    }).catch(next);
}

function getAccessories(req, res, next) {
    res.render(path.resolve('./views/createAccessory.hbs'));
}

function postAccessories(req, res, next) {
    const { name = null, image = null, desc = null } = req.body;
    accessoriesModel.create({ name, image, desc }).then(() => {
        res.redirect('/');
    }).catch(next);
}

function getAttachAccessory(req, res, next) {
    const { id: cubeId } = req.params;
    cubeModel
        .findById(cubeId)
        .then(cube => Promise.all([cube, accessoriesModel.find({ cubes: { $nin: cubeId } })]))
        .then(([cube, filterAccessories]) => {
            res.render('./../../views/attachAccessory.hbs', {
                cube,
                accessories: filterAccessories.length > 0 ? filterAccessories : null
            });
        })
        .catch(next);
}

function postAttachAccessory(req, res, next) {
    const { id } = req.params;
    const { accessory: accessoryId } = req.body;
    Promise.all([
        cubeModel.update({ _id: id }, { $push: { accessories: accessoryId } }),
        accessoriesModel.update({ _id: accessoryId }, { $push: { cubes: id } })
    ]).then(() => { res.redirect('/'); }).catch(next);
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
    getAccessories,
    getAttachAccessory,
    postAttachAccessory
};