const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const path = require("path");

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => callback(null, true)
  })
);
// app.use(express.static("public"));

app.get("/", (req, res) => {
  return res
    .status(201)
    .cookie("superToken", true, {
      httpOnly: false,
      sameSite: "none",
      secure: false
    })
    .send("superToken Cookie was set to be true");
});

app.get("/script.js", (req, res) => {
  if (req.cookies.superToken) {
    res.sendFile(`${__dirname}/init.js`);
  } else {
    res.status(204);
    res.setHeader("content-type", "text/javascript");
    res.end();
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
