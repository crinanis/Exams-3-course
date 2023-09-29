const express = require("express");
const app = express();
const {Sequelize, Op} = require("sequelize");
const port = 3000;
const parser = require("body-parser");
app.use(parser.json());

const sequelize = new Sequelize("exam", "node", "node", {
    host: "localhost",
    dialect: "mssql",
    define: {timestamps: false},
});

const Cars = sequelize.define("cars",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        model: Sequelize.STRING,
        driverId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
    },
    sequelize
);

const Drivers = sequelize.define("drivers",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        drivingExp: Sequelize.INTEGER,
    },
    sequelize
);

Drivers.hasMany(Cars);
Cars.belongsTo(Drivers);

app.post("/drivers", async (req, res) => {
    const {name, drivingExp} = req.body;
    try {
        const newDriver = await Drivers.create({
            name: name,
            drivingExp: parseInt(drivingExp),
        });

        res.send(newDriver);
    } catch (error) {
        res.send(error);
    }
});

app.post("/cars", async (req, res) => {
    const {model, driverId} = req.body;
    try {
        const isExist = await Drivers.findOne({
            where: {
                id: parseInt(driverId),
            },
        });

        console.log("isExist  " + isExist);

        if (isExist === null) {
            res.send("no driver with this id");
        } else {
            const newCar = await Cars.create({
                model: model,
                driverId: parseInt(driverId),
            });

            res.send(newCar);
        }
    } catch (error) {
        res.send(error);
    }
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`server started on port: ${port}`);
    });
});
