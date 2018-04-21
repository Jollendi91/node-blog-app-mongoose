const express = require('express');
const router = express.Router();

const { Posts } = require('./models');

router.get('/', (req, res) =>{
    Posts
        .find()
        .then(posts => {
            res.json({posts});
        });
});

module.exports = {postsRouter: router};