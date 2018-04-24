const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Posts } = require('./models');

router.get('/', (req, res) =>{
    Posts
        .find()
        .then(posts => {
            res.json({
                posts: posts.map((post) => post.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

router.get('/:id', (req, res) => {
    Posts
        .findById(req.params.id)
        .then(post => res.json(post.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['title', 'author', 'content'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing '${field}' in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Posts
        .create({
            title: req.body.title,
            author: {
                firstName: req.body.author.firstName,
                lastName: req.body.author.lastName
            },
            content: req.body.content
        })
        .then( post => res.status(201).json(post.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

router.put('/:id', (req, res) => {
    if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (
            `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
            console.error(message);
            return res.status(400).json({message: message});
    }

    const toUpdate = {};
    const updateableFields = ['title', 'content', 'author'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Posts
        .findByIdAndUpdate(req.params.id, { $set: toUpdate }, { new: true })
        .then(post => res.status(204).end())
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

router.delete('/:id', (req, res) => {
    Posts 
        .findByIdAndRemove(req.params.id)
        .then(post => res.status(204).end())
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = {postsRouter: router};