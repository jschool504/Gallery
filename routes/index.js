var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var middleware = require("../middleware");
var router = express.Router();
var helpers = require("../helpers");

var passport = require("passport");

// INDEX ROUTES

// Landing Page

router.get("/", function(request, response) {
	var random_available_works_query = "SELECT * FROM Works WHERE sold = 0 ORDER BY RAND() LIMIT 3";
	var post_query = "SELECT * FROM Posts LIMIT 3";
	connection.query(helpers.logQuery(random_available_works_query), function(error, workRows) {
		connection.query(helpers.logQuery(post_query), function(error, postRows) {
			response.render("welcome", {works:workRows, posts:postRows});
		});
	});
});

// User auth

router.get("/login", function(request, response) {
	response.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}), function(request, response) {
	
});

router.get("/signup", middleware.isLoggedIn, function(request, response) {
	response.render("signup");
});

router.post("/signup", middleware.isLoggedIn, function(request, response) {
	var signup_query = "INSERT INTO Users (name, password) VALUES ('" + helpers.escapeSQLString(request.body.username) + "','" + bcrypt.hashSync(request.body.password) + "')";
	connection.query(helpers.logQuery(signup_query), function(error) {
		response.redirect("/");
	});
});

router.get("/logout", function(request, response) {
	request.logout();
	response.redirect("/");
});

// About Page

router.get("/about", function(request, response) {
	response.render("about");
});

module.exports = router;
