const express = require('express');
const crypto = require('crypto');
const app = express();
const { Worker } = require('worker_threads');

app.get('/', (req, res) => {
    const worker = new Worker('./worker.js');

    worker.on('message', function (message) {
        console.log(message);
        res.send('' + message);
    });

    worker.postMessage('start!');
});

app.get('/fast', (req, res) => {
    res.send('This was fast!');
});

app.listen(3000);

//node worker-threads.js
//ab -c 6 -n 6 localhost:3000/
