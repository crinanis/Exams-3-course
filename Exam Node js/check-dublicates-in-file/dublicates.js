const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/', (req, res) => {
    let {id, text} = req.body;

    fs.readFile('data.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).send('error occurred...');
            return;
        }

        let lines = data.trim().split('\n');
        for (let line of lines) {
            if (JSON.parse(line).id === id) {
                res.status(400).send('duplicate...');
                return;
            }
        }

        fs.appendFile('data.txt', JSON.stringify({id, text}) + '\n', err => {
            if (err) {
                console.error(err);
                res.status(500).send('error in writing occurred...');
            } else {
                res.status(201).send('line was written to the file')
            }
        })
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})