var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
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

// PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret: "CHEESE",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
	function(username, password, done) {
		connection.query("SELECT * FROM Users WHERE Users.name = '" + username + "' LIMIT 1", function(error, rows, fields) {
			if (error) {
				return done(error);
			}
			
			user = rows[0];
			
			if (user == null) {
				return done(null, false, {message: "I think that's the wrong username :-("});
			}
			
			if (user.password !== password) {
				return done(null, false, {message: "Sorry that's the wrong password :-("})
			}
			
			return done(null, user);
		});
	}
));
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	connection.query("SELECT * FROM Users WHERE Users.id = " + id, function(error, rows, fields) {
		return done(error, rows[0]);
	});
});

app.use(function(request, response, next) {
	response.locals.currentUser = request.user;
	next();
});

// ROUTES

// Landing Page

app.get("/", function(request, response) {
	response.render("welcome");
});

// Works and Gallery

app.get("/works", function(request, response) {
	connection.query("SELECT * FROM Works", function(error, rows, fields) {
		response.render("work/index", {works:rows});
	});
});

app.get("/works/:title", function(request, response) {
	connection.query("SELECT * FROM Works WHERE title = '" + request.params.title + "'", function(error, rows, fields) {
		response.render("work/show", {work:rows[0]});
	});
});

app.get("/works/:title/edit", function(request, response) {
	connection.query("SELECT * FROM Works WHERE title = '" + request.params.title + "'", function(error, rows, fields) {
		response.render("work/edit", {work:rows[0]});
	});
})

app.put("/works/:title", function(request, response) {
	
	connection.query("UPDATE Works SET title='" + request.body.title + "', image='" + request.body.image_url + "', info='" + request.body.info + "' WHERE title = '" + request.params.title + "'", function(error) {
		if (error) {
			console.log(error);
		} else {
			response.redirect("/works/" + request.body.title);
		}
	});
})

// User auth

app.get("/login", function(request, response) {
	response.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}), function(request, response) {
	
});

app.get("/logout", function(request, response) {
	request.logout();
	response.redirect("/");
});

// About Page

app.get("/about", function(request, response) {
	response.render("about");
});

// LISTENING

app.listen(process.env.PORT || 80, function() {
	console.log("Gallery is running...");
});
