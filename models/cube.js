class CubeModel {
    constructor() {
        this.data = require('../config/database.json');
        this.fs = require('fs');
        this.path = require('path');
    }

    insert(newCube) {
        this.data.lastIndex++
        const newIndex = this.data.lastIndex;
        const cube = { id: newIndex, ...newCube };
        const newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(cube)
        }

        return this._write(newData, cube);
    }

    _write(newData, cube) {
        return new Promise((res, rej) => {
            this.fs.writeFile(this.path.resolve('./config/database.json'), JSON.stringify(newData), (err) => {
                if (err) {
                    rej(err);
                    return;
                }
                this.data = newData;
                res(cube);
            });
        });
    }

    update(id, updates) {
        const entityIndex = this.data.entities.findIndex(cube => cube.id === id);
        const entity = this.data.entities[entityIndex];
        const updatedEntity = { ...entity, ...updates };

        const newData = {
            lastIndex: this.data.lastIndex,
            entities: [
                ...this.data.entities.slice(0, entityIndex),
                updatedEntity,
                ...this.data.entities.slice(entityIndex + 1)
            ]
        }

        return this._write(newData, updatedEntity);
    }

    delete(id) {
        const deletedEntity = this.data.entities.find(cube => cube.id === id);
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(cube => cube.id != id)
        }
        return this._write(newData, deletedEntity);
    }

    getOne(id) {
        return this.find(cube => cube.id === id);
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }

    create(name, image, desc, difficulty) {
        return { name, image, desc, difficulty };
    }

    find(predicate) {
        return Promise.resolve(this.data.entities.filter(predicate));
    }
}

module.exports = new CubeModel();