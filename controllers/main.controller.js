const path = require('path');
const { cubeModel, accessoriesModel } = require('./../models/index');

function getIndex(req, res, next) {
    const { user } = req;
    cubeModel.find().then(cubes => {
        res.render(path.resolve('./views/index.hbs'), { cubes, user });
    }).catch(next);
}

function postIndex(req, res, next) {
    const { user } = req;
    let { search, from, to } = req.body;
    from === '' ? from = 0 : Number(from);
    to === '' ? to = 6 : Number(to);

    cubeModel.find().where('name').equals(search).where('difficulty').gt(from).lt(to).then(cubes => {
        res.render(path.resolve('./views/index.hbs'), { cubes, user });
    }).catch(next);
}

function details(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    cubeModel.findById(id).populate('accessories').then(cube => {
        if (!cube) {
            res.redirect('/404');
            return;
        }
        res.render(path.resolve('./views/details.hbs'), { cube, user });
    }).catch(next);
}

function notFound(req, res, next) {
    const { user } = req;
    res.render(path.resolve('./views/404.hbs'), { user });
}

function getCreate(req, res, next) {
    const { user } = req;
    res.render(path.resolve('./views/create.hbs'), { user });
}

function postCreate(req, res, next) {
    const { name = null, image = null, desc = null, difficulty = null } = req.body;
    cubeModel.create({ name, image, desc, difficulty, creatorId: user._id }).then(cube => {
        res.redirect('/');
    }).catch(next);
}

function getAccessories(req, res, next) {
    const { user } = req;
    res.render(path.resolve('./views/createAccessory.hbs'), { user });
}

function postAccessories(req, res, next) {
    const { name = null, image = null, desc = null } = req.body;
    accessoriesModel.create({ name, image, desc }).then(() => {
        res.redirect('/');
    }).catch(next);
}

function getAttachAccessory(req, res, next) {
    const { id: cubeId } = req.params;
    const { user } = req;
    cubeModel
        .findById(cubeId)
        .then(cube => Promise.all([cube, accessoriesModel.find({ cubes: { $nin: cubeId } })]))
        .then(([cube, filterAccessories]) => {
            res.render('./../../views/attachAccessory.hbs', {
                cube,
                accessories: filterAccessories.length > 0 ? filterAccessories : null,
                user
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
    const { user } = req;
    res.render(path.resolve('./views/about.hbs'), { user });
}

function getEdit(req, res, next) {
    const { user } = req;
    const { id } = req.params;
    cubeModel.findById(id).then(cube => {
        res.render(path.resolve('./views/editCubePage.hbs'), { cube, user });
    }).catch(next)
}

function postEdit(req, res, next) {
    const { name = null, image = null, desc = null, difficulty = null } = req.body;
    const { id } = req.params;
    cubeModel.findById(id)
        .then(cube => {
            return cube.update({ name, image, desc, difficulty });
        })
        .then(() => { res.redirect('/'); })
        .catch(next);
}

function getDelete(req, res, next) {
    const { user } = req;
    const { id } = req.params;
    cubeModel.findById(id).then(cube => {
        res.render(path.resolve('./views/deleteCubePage.hbs'), { cube, user });
    }).catch(next)
}

function postDelete(req, res, next) {
    const { id } = req.params;
    cubeModel.findByIdAndRemove(id)
        .then(() => { res.redirect('/'); })
        .catch(next);
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
    postAttachAccessory,
    getEdit,
    postEdit,
    getDelete,
    postDelete
};