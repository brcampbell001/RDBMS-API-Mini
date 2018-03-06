const express = require('express');
// const knex = require('../database/db'); moved to controller

const db = require('./zooController');

const zooRouter = express.Router; //creates the router

//will configure routes later

zooRouter.post('/', (req, res) => {
    const zoo = req.body;
    db
        .addZoo(zoo)
        // knex
        //     .insert(zoo).into('zoos')
        .then(id => {
            res.status(201).json({ id })
        })
        .catch(err => {
            res.status(500).json({ msg: 'err' });
        });
});

zooRouter.get('/', (req, res) => {
    db
        .getAll()
        // knex('zoos')
        .then(
            zoos => {
                res.status(200).json(zoos);
            })
        .catch(err => {
            res.status(500).json({ msg: 'Error retrieving Zoos' });
        });
});

zooRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    db
        .getById(id)
        // knex('zoos')
        //     .where('id', id)
        .then(zoos => {
            if (zoos.length > 0) {
                res.status(200).json(zoos);
            } else {
                res.status(404).json({ msg: `Zoo with id: ${id} does not exist` })
            }
        })
        .catch(err => {
            res.status(500).json({ msg: 'Error retrieving Zoos' });
        });
});

zooRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const zoo = req.body;

    // knex('zoos').where({ id }).update("name", zooUpdate)
    db
        .update(id, zoo)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ msg: 'Updated Succesfully' })
            } else {
                res.status(404).json({ msg: 'Zoo does not exist' })
            }
        })
.catch(err => {
    res.status(500).json({ msg: 'Error updating zoo' })
})
});

zooRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    // knex('zoos').where({ id }).del()
    db
    nuke(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ msg: 'Delete successful' })
            } else {
                res.status(404).json({ msg: 'Zoo does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ msg: 'Error nuking zoos' });
        })
});

module.exports = zooRouter;
