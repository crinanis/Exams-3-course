const app = require('express')();
const cookieParser = require('cookie-parser')();

app.use(cookieParser);

app.get('/set-cookie', (req, res) => {
    res.cookie('num', Math.floor(Math.random() * 12), {
        maxAge: 3000
    }).send('ok');
})

app.get('/get-cookie', (req, res) => {
    let value = req.cookies.num;
    if (value < 5) {
        res.clearCookie('num').send(value);
    } else {
        res.cookie('num', Math.floor(Math.random() * 12), {
            maxAge: 3000
        }).send('ok');
    }
})

app.listen(3000);
