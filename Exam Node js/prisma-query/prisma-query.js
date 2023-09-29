const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const app = require('express')();

app.use('/', async (req, res) => {
    let namepart = req.query.namepart;
    console.log(namepart);

    if (namepart) {
        let users = await prisma.users.findMany({
            where: {
                name: {
                    contains: namepart
                }
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        res.end(JSON.stringify(users));
    }
})


app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})