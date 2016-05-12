var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

var seedDB = require("./seed.js");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Jeremydelta5",
	database: "gallery"
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

seedDB(connection);

// ROUTES

app.get("/", function(request, response) {
	response.render("welcome");
});

app.get("/works", function(request, response) {
	connection.query("SELECT * FROM Works", function(error, rows, fields) {
		response.render("work/index", {works:rows});
	});
});

app.get("/works/:title", function(request, response) {
	console.log(request.params.title);
	connection.query("SELECT * FROM Works WHERE title = '" + request.params.title + "'", function(error, rows, fields) {
		response.render("work/show", {work:rows[0]});
	});
});

app.get("/about", function(request, response) {
	response.render("about");
});

// LISTENING

app.listen(process.env.PORT || 80, function() {
	console.log("Gallery is running...");
});
