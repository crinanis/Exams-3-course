const {Sequelize, DataTypes} = require('sequelize');
const express = require('express');
const {urlencoded} = require("express");
const app = express();

app.use(urlencoded({extended: false}));

const sequelize = new Sequelize('usersSeq', 'sa', '12345', {
    host: 'localhost',
    port: 1433,
    dialect: "mssql"
})

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

sequelize.sync({force: true}).then(r => {
    console.log(r);
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
});

app.post('/users', async (req, res) => {
    let {name, email} = req.body;
    let transaction = await sequelize.transaction();
    try {
        let user = await User.create({
            name, email
        }, {transaction});
        await transaction.commit();
        res.status(201).json(user);
    } catch (e) {
        await transaction.rollback();
        res.status(400).send('failed');
    }
})

