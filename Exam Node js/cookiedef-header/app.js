const app = require('express')();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    res.cookie('puk1', 'ooo', {expires: new Date(Date.now() + 90000)});
    res.status(200).send('okay');
})

app.get('/set-cookie2', (req, res) => {
    res.setHeader('Set-Cookie', 'puk2=pukkkkk; Max-age=' + 5 * 60 * 60 + ';' + 'Path=/;');
    res.status(200).send('okay');
})

app.get('/clear-cookie', (req, res) => {
    res.setHeader("Set-Cookie", "puk2=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    res.cookie('puk1', '', {expires: new Date()});
    res.status(200).send('okay');
})

app.get('/cookie-info', (req, res) => {
    res.status(200).send(req.cookies.puk1);
})

let value = '';
app.use((req, res, next) => {
    value = req.cookies.puk2;
    console.log(value);
    next();
})

app.get('/cookie-info2', (req, res) => {
    res.status(200).send(value);
})

app.listen(3000, () => {
    console.log('puk');
})