const express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const {static} = require("express");
const app = express();

app.use(static('public'));

const sequelize = new Sequelize('postsSeq', 'sa', '12345', {
    dialect: "mssql",
    host: 'localhost',
    port: 1433
})

const Post = sequelize.define('posts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

sequelize.sync({force: false}).then(r => {
    console.log(r);
    app.listen(3000, () => {
        console.log('http://localhost:3000');
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/static.html');
})

app.get('/posts', async (req, res) => {
    const {page, take} = req.query;
    let posts = await Post.findAll({
        offset: parseInt(page),
        limit: parseInt(take)
    })

    let count = await Post.count();

    res.json({count:count, posts:posts});
})