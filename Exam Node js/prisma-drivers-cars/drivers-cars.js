const {PrismaClient} = require('@prisma/client');
const app = require('express')();
const prisma = new PrismaClient();

app.get('/cars/:driverExp', async (req, res) => {
    const driverExp = req.params.driverExp;

    let cars = await prisma.cars.findMany({
        where: {
            driver: {
                drivingExp: {
                    lt: parseInt(driverExp)
                }
            }
        },
        select: {
            model: true,
            driver: {
                select: {
                    name: true,
                    drivingExp: true
                }
            }
        }
    })

    res.json(cars);
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})