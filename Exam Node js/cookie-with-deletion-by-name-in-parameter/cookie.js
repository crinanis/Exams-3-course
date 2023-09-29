const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Set cookie with value and expiration time
app.get("/set-cookie", (req, res) => {
  res.cookie("cookieName", "cookieValue", { expires: new Date(Date.now() + 900000), path: "/" });
  res.send("Cookie set successfully");
});

app.get("/clear-cookie", (req, res) => {
    res.cookie("cookieName", "", { expires: new Date(0), path: "/" });
    res.send("Cookie cleared successfully");
  })

let cookiedate='';
let cookieValue='';

app.use((req, res, next) => {
  cookieValue = req.cookies.cookieName;
  cookiedate = new Date(req.cookies.cookieName);
  next();
});

app.get("/get-cookie", (req, res) => {
    res.send(`Cookie value: ${cookieValue}, ${cookiedate}`);
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});