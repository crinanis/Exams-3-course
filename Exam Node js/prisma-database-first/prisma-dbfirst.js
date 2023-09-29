const express = require('express');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Handler for adding a new car
app.post('/cars', async (req, res) => {
    const {model, driverId} = req.body;
    const newCar = await prisma.cars.create({
        data: {
            model,
            driverId
        }
    });
    res.json(newCar);
});

// Handler for adding a new driver
app.post('/drivers', async (req, res) => {
    const {name, exp} = req.body;
    const newDriver = await prisma.drivers.create({
        data: {
            name,
            exp
        }
    });
    res.json(newDriver);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});