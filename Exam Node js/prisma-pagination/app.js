const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))

app.get('/posts', async (req, res) => {
    let {page, take} = req.query;
    let posts = await prisma.post.findMany({
        skip: parseInt(page),
        take: parseInt(take)
    })
    let count = await prisma.post.count();
    res.json({posts: posts, count: count});
})

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
});
