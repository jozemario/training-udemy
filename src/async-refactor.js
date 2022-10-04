process.env.UV_THREADPOOL_SIZE = 5;
const cluster = require('cluster');
const crypto = require('crypto');
console.log(cluster.isMaster);

if (cluster.isMaster) {
    cluster.fork();
    console.log('Master Mode');
} else {
    console.log('Child Mode');
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkd2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        });
    });
    app.get('/fast', (req, res) => {
        res.send('This is fast!');
    });

    app.listen(3000);
}
//Benchmarks
//ab -c 50 -n 500 localhost:3000/fast
