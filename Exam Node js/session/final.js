const app = require('express')();
const session = require('express-session');

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: '1234'
}))

app.use((req, res, next) => {
    if (req.session.creationTime !== undefined) {
        let diff = Date.now() - req.session.creationTime;
        console.log('diff in sec is: ' + diff / 1000 + 's');
        if (diff > 30000) {
            req.session.destroy();
            throw new Error('Session expired');
        }
    }
    next();
})

app.get('/', (req, res) => {
    if (req.session.creationTime) {
        console.log('old time:' + req.session.creationTime);
    }

    let now = Date.now();
    req.session.creationTime = now;
    console.log('new: ' + now);
    res.status(200).send('creationTime updated');
})

app.use((err, req, res, next) => {
    if (err) {
        res.status(505).send(err.message);
    }
    next();
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})