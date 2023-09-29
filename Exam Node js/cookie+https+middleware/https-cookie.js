const https = require('https');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
var result = '';
const options = {
  key: fs.readFileSync('localhost (2).key'),
  cert: fs.readFileSync('localhost (2).crt')
};

app.use((req, res, next) => {
  const myCookie = req.cookies?.myCookie;
  res.status(200);
  result = 'The value of myCookie is: ' + myCookie 
  next();
})

app.get('/login', (req, res) => {
  const cookieOptions = {
    maxAge: 5 * 60 * 60 * 1000, // 5 hours
  };
  res.setHeader('Set-Cookie', 'myCookie=myValue; Path=/login; Max-Age=' + cookieOptions.maxAge + '; Secure=true');
  res.status(200);
  res.send(result);
});

https.createServer(options, app).listen(3000);