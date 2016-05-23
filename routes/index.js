var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var middleware = require("../middleware");
var router = express.Router();

var passport = require("passport");

// INDEX ROUTES

// Landing Page

router.get("/", function(request, response) {
	response.render("welcome");
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
	var signup_query = "INSERT INTO Users (name, password) VALUES ('" + request.body.username + "','" + bcrypt.hashSync(request.body.password) + "')";
	console.log(signup_query);
	connection.query(signup_query, function(error) {
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
