const express = require('express');
const knex = require('../database/db');

const bearRouter = express.Router;

bearRouter.post('/', (req, res) => {
    const bear = req.body;

    knex
        .insert(bear).into('bears')
        .then(ids => {
            res.status(201).json({ id });
        })
        .catch(err => {
            res.status(500).json({ msg: 'err' })
        });
});

bearRouter.get('/', (req, res) => {
    knex('bears')
        .then(bears => {
            res.status(200).json({ bears });
        })
        .catch(err => {
            res.status(500).json({ msg: 'Error retrieving Bears' })
        });
});

bearRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    knex('bears')
        .where('id', id)
        .then(bears => {
            if (bears.length > 0) {
                res.status(200).json(bears);
            } else {
                res.status(404).json({ msg: `Bear with id: ${id} does not exist` });
            }
        })
        .catch(err => {
            res.status(500).json({ msg: 'Error retrieving Bears' });
        });
});

bearRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const bearUpdate = req.body.name;
    knex('bears').where({ id }).update("name", bearUpdate)
        .then(response => {
            res.status(200).json({ success: true });
        })
        .catch(err => {
            res.status(500).json({ msg: `Could not update Bear ID: ${id}` })
        })
        .catch(err => {
            res.status(404).json({ msg: `Bear ID ${id} not found.` })
        })
});

bearRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    knex('bears').where('id', id).del()
        .then(bear => {
            if (bear === 0) {
                res.status(404).json({ msg: `Bear ID ${id} not found.` });
            } else {
                res.status(200).json({ success: true });
            }
        })
        .catch(err => {
            res.status(500).json({ msg: `Could not delete Bear ID: ${id}` })
        });
});

module.exports = bearRouter;
