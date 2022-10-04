const cluster = require('cluster');
console.log(cluster.isMaster);

if (cluster.isMaster) {
    cluster.fork();
    console.log('Master Mode');
} else {
    console.log('Child Mode');
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there');
    });
    app.get('/fast', (req, res) => {
        res.send('This is fast!');
    });

    app.listen(3000);
}
//Benchmarks
//ab -c 50 -n 500 localhost:3000/fast
