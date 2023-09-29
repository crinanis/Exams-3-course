const {Sequelize, DataTypes} = require('sequelize');
const express = require('express');
const app = express();
app.use(express.json());

const sequelize = new Sequelize('turtle', 'sa', '12345', {
    host: 'localhost',
    port: 1433,
    dialect: 'mssql'
});

const Weapon = sequelize.define('Weapon', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

const Pizza = sequelize.define('Pizza', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});

const Turtle = sequelize.define('Turtle', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weaponId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'Weapons',
            key: 'id',
            onDelete: 'cascade'
        }
    }
}, {
    timestamps: false
});

const TurtlePizza = sequelize.define('TurtlePizza', {}, {
    timestamps: false
})

Pizza.belongsToMany(Turtle, {
    through: TurtlePizza,
    foreignKey: 'pizza_id',
});

sequelize.sync({force: true})
    .then(() => {
        app.listen(3000, () => {
            console.log('Сервер запущен на порту 3000');
        });
    })
    .catch((error) => {
        console.error('Ошибка синхронизации базы данных:', error);
        process.exit(1); // Завершаем процесс Node.js с ошибкой
    });

app.post('/add-turtle-info', async (req, res) => {
    const {turtleName, weaponId, pizza1, pizza2} = req.body;
    let turtleId;
    let transaction = await sequelize.transaction();
    try {
        
	//тут дописать добавление в бд

        await transaction.commit();
        res.status(201).send('okay');
    } catch (error) {
        console.error('Ошибка:', error);
        await transaction.rollback();
        res.status(500).json({success: false, message: 'Произошла ошибка при добавлении информации о черепашке.'});
    }
});
