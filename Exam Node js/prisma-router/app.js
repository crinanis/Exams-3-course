const express = require('express');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users from database');
    }
});

router.post('/users', async (req, res) => {
    const {name, email} = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user in database');
    }
});

router.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                email,
            },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user in database');
    }
});

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user from database');
    }
});

app.use(express.json());
app.use(router);

app.use('/', (req, res, next) => {
    let error = new Error('you gay');
    next(error);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});