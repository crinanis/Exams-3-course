const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {static} = require("express");

app.use(static(__dirname));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.post('/set-cookie', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    res.cookie('id', id, {
        maxAge: 900000
    })
        .cookie('name', name, {
            maxAge: 90000
        })
    res.redirect('/check');
})

app.get('/check', (req, res) => {
    res.status(200).send(req.cookies.name + req.cookies.id);
})

app.listen(3000,()=>{
    console.log('ex');
})