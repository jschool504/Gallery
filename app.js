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

seedDB(connection, "Posts");

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

// index

app.get("/works", function(request, response) {
	connection.query("SELECT * FROM Works", function(error, rows, fields) {
		response.render("work/index", {works:rows});
	});
});

// new

app.get("/works/new", function(request, response) {
	response.render("work/new");
});

app.post("/works", function(request, response) {
	var new_query = "INSERT INTO Works (title, image, width, height, info) VALUES (";
	var data = "'" + request.body.title + "','" + request.body.image_url + "'," + request.body.width + "," + request.body.height + ",'" + request.body.info + "'";
	new_query = new_query + data + ")";
	connection.query(new_query, function(error, rows, fields) {
		response.redirect("/works");
	});
});

// show

app.get("/works/:id", function(request, response) {
	connection.query("SELECT * FROM Works WHERE id='" + request.params.id + "'", function(error, rows, fields) {
		response.render("work/show", {work:rows[0]});
	});
});

// edit

app.get("/works/:id/edit", function(request, response) {
	connection.query("SELECT * FROM Works WHERE id='" + request.params.id + "'", function(error, rows, fields) {
		response.render("work/edit", {work:rows[0]});
	});
})

app.put("/works/:id", function(request, response) {
	connection.query("UPDATE Works SET title='" + request.body.title + "', image='" + request.body.image_url + "', info='" + request.body.info + "' WHERE id='" + request.params.id + "'", function(error, rows) {
		if (error) {
			console.log(error);
		} else {
			console.log(request.body.id);
			response.redirect("/works/" + request.params.id);
		}
	});
})

// delete

app.delete("/works/:id", function(request, response) {
	connection.query("DELETE FROM Works WHERE id=" + request.params.id, function(error, rows, fields) {
		response.redirect("/works");
	});
});

// Posts

// index

app.get("/posts", function(request, response) {
	connection.query("SELECT * FROM Posts", function(error, rows, fields) {
		response.render("post/index", {posts:rows});
	})
})

// add

app.get("/posts/new", function(request, response) {
	response.render("post/new");
});

app.post("/posts", function(request, response) {
	connection.query("INSERT INTO Posts (title, date, content) VALUES ('" + request.body.title + "','" + request.body.date + "','" + request.body.content + "')", function(error, rows, fields) {
		response.redirect("/posts");
	});
});

// edit

app.get("/posts/:id/edit", function(request, response) {
	connection.query("SELECT * FROM Posts WHERE id=" + request.params.id, function(error, rows, fields) {
		response.render("post/edit", {post:rows[0]});
	});
})

app.put("/posts/:id", function(request, response) {
	console.log(request);
	connection.query("UPDATE Posts SET title='" + request.body.title + "',date='" + request.body.date + "',content='" + request.body.content + "' WHERE id=" + request.params.id, function(error, rows, fields) {
		if (error) {
			response.redirect("/posts/" + rows[0].id + "/edit", {post:rows[0]});
			console.log(error);
		}
		response.redirect("/posts/" + request.params.id);
	});
});

// delete

app.delete("/posts/:id", function(request, response) {
	connection.query("DELETE FROM Posts WHERE id=" + request.params.id, function(error, rows, fields) {
		response.redirect("/posts");
	});
});

// show

app.get("/posts/:id", function(request, response) {
	connection.query("SELECT * FROM Posts WHERE id=" + request.params.id, function(error, rows, fields) {
		response.render("post/show", {post:rows[0]});
	});
});

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
