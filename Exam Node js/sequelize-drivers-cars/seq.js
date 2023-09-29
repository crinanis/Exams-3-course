const {Sequelize, DataTypes, Op} = require('sequelize');
const app = require('express')();

const sequelize = new Sequelize('carsSeq', 'sa', '1111', {
    port: 1433,
    host: 'localhost',
    dialect: 'mssql'
})

const Drivers = sequelize.define('Driver', {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drivingExp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

const Cars = sequelize.define('Car', {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})

Drivers.hasMany(Cars);
Cars.belongsTo(Drivers);

sequelize.sync().then(res => {
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
}).catch(e => {
    console.log(e);
})

app.get('/cars/:driverExp', async (req, res) => {
    const exp = req.params.driverExp;

    let cars = await Cars.findAll({
        attributes: ['model'],
        include: [{
            model: Drivers,
            required: true,
            attributes: ['drivingExp', 'name'],
            where: {
                drivingExp: {
                    [Op.lt]: exp
                }
            }
        }]
    })
    res.json(cars);
})