var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mywebsite"
});

connection.connect();

app.get('/submit',function(req,res) {
    res.render('index');
});

app.post('/submit',urlencodedParser, function(req, res, next) {
    console.log(req.body.name);
    console.log(req.body.message);
    connection.connect(function(err) {
        if (err) throw  err;
        console.log("connected");
        var sql = "INSERT INTO `users` (`name`,`message`) VALUES ('" + req.body.name + "', '" + req.body.message + "')";
        con.query(sql, function(err, result)  {
            if(err) throw err;
            console.log("table created");
        });
    });
    res.render('index', {title: 'Express'});
});

connection.end();

app.listen(3000, function () {
    console.log('Listening on port 3000');
});