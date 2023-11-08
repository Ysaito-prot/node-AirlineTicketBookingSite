const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "flight_ticket_reservation_db",
  multipleStatements: true,
});

// cssファイルの取得
app.use(express.static("assets"));

// mysqlからデータを持ってくる
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html/index.html"));
});

app.get("/roginForm", (req, res) => {
  const userInfo = "SELECT * from rogin;";

  con.query(userInfo, function (err, result, fields) {
    if (err) throw err;
    res.render("roginForm", {
      userInfo: result,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
