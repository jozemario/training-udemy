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

//PM2
//pm2 start cluster-threadpool-pm2.js -i 0

//Benchmarks
//ab -c 50 -n 500 localhost:3000/fast
