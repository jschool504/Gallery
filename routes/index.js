var express = require("express");
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

router.get("/logout", function(request, response) {
	request.logout();
	response.redirect("/");
});

// About Page

router.get("/about", function(request, response) {
	response.render("about");
});

module.exports = router;
