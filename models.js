'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: Object, required: true},
    created: {type: Date, default: Date.now()}
});

postSchema.virtual('authorString').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim()
});

postSchema.methods.serialize = function() {
    return {
        id: this._id,
        title: this.title,
        author: this.authorString,
        content: this.content,
        created: this.created
    };
}

const Posts = mongoose.model('Posts', postSchema);

module.exports = {Posts};