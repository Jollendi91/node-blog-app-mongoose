'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const {postsRouter} = require('./postsRoutes');


const app = express();
app.use(bodyParser.json());

app.use('/posts', postsRouter);

let server;

function runServer (databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

if(require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}
