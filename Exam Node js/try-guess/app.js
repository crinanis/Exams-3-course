const express = require('express');
const app = express();

app.use(express.text());

let num = Math.floor(Math.random() * 13);

let middleware = (req, res, next) => {
    let value = req.body;
    if (+value === num) {
        res.send('krasava');
        next();
    } else {
        throw new Error('lox');
    }
}

app.post('/', middleware, (req, res) => {

})

app.get('/update', (req, res) => {
    num = Math.floor(Math.random() * 13);
    console.log(num);
    res.status(200).send(num.toString());
})

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(err.message);
})

app.listen(3000, () => {
    console.log('puk' + num);
})