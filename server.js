const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db');

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', function (req, res) {
    res.status(200).json({ api: 'running man' });
});

//Add new zoos and bears
server.post('/zoos', (req, res) => {
    const zoo = req.body;
    knex
        .insert(zoo).into('zoos')
        .then(ids => {
            res.status(201).json({ id })
        })
        .catch(err => {
            res.status(500).json({ msg: 'err' });
        });
});

server.post('/bears', (req, res) => {
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

//Get all zoos and all bears
server.get('/zoos', (req, res) => {
    knex('zoos').then(
        zoos => {
            res.status(200).json(zoos);
        })
        .catch(err => {
            res.status(500).json({ msg: 'Error retrieving Zoos' });
        });
});

server.get('/bears', (req, res) => {
    knex('bears')
        .then(bears => {
            res.status(200).json({ bears });
        })
        .catch(err => {
            res.status(500).json({ msg: 'Error retrieving Bears' })
        });
});

//Get Zoos and Bears by ID
server.get('/zoos/:id', (req, res) => {
    const { id } = req.params;
    knex('zoos')
        .where('id', id)
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

server.get('/bears/:id', (req, res) => {
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

//Update Zoos and Bears
server.put('/zoos/:id', (req, res) => {
    const { id } = req.params;
    const zooUpdate = req.body.name;
    knex('zoos').where({ id }).update("name", zooUpdate)
        .then(response => {
            res.status(200).json({ success: true });
        })
        .catch(err => {
            res.status(404).json({ msg: `Zoo ID ${id} not found.` })
        })
        .catch(err => {
            res.status(500).json({ msg: `Could not update Zoo ID: ${id}` })
        })
});

server.put('/bears/:id', (req, res) => {
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
})

//Delete Zoos and Bears
server.delete('/zoos/:id', (req, res) => {
    const { id } = req.params;
    knex('zoos').where({ id }).del()
        .then(zoo => {
            if (zoo === 0) {
                res.status(404).json({ msg: `Zoo ID ${id} not found.` });
            } else {
                res.status(200).json({ success: true });
            }
        })
        .catch(err => {
            res.status(500).json({ msg: `Could not delete Zoo ID: ${id}` });
        });
});

server.delete('/bears/:id', (req, res) => {
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

const port = 3000;
server.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});
