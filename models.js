'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    created: {type: Date, default: Date.now()}
});

const Posts = mongoose.model('Posts', postSchema);

module.exports = {Posts};