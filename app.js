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

//seedDB(connection, "Works");

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

app.get("/works/search", function(request, response) {
	var searchTerm = "%";
	if (request.query.f != "Any") {
		searchTerm = request.query.f;
	}
	
	var widthTerm = "%";
	if (request.query.w != "Any") {
		widthTerm = request.query.w.split("\"")[0];
	}
	
	var heightTerm = "%";
	if (request.query.h != "Any") {
		heightTerm = request.query.h.split("\"")[0];
	}
	
	var search_query = "SELECT * FROM Works WHERE title LIKE '%";
	search_query = search_query + request.query.q + "%' ";
	search_query = search_query + "AND type LIKE '" + searchTerm + "' ";
	search_query = search_query + "AND width LIKE '" + widthTerm + "' ";
	search_query = search_query + "AND height LIKE '" + heightTerm + "'";
	console.log(search_query);
	
	connection.query(search_query, function(error, workRows, fields) {
		if (error) {
			console.log(error);
		}
		
		var type_query = "SELECT DISTINCT type FROM Works ORDER BY type ASC";
		console.log(type_query);
		connection.query(type_query, function(error, typeRows, fields) {
			if (error) {
				console.log(error);
			}
			
			var width_query = "SELECT DISTINCT width FROM Works ORDER BY width DESC";
			console.log(width_query);
			connection.query(width_query, function(error, widthRows, fields) {
				if (error) {
					console.log(error);
				}
				
				var height_query = "SELECT DISTINCT height FROM Works ORDER BY height DESC";
				console.log(height_query);
				connection.query(height_query, function(error, heightRows, fields) {
					if (error) {
						console.log(error);
					}
				
					response.render("work/index", {works:workRows, workTypes:typeRows, widths:widthRows, heights:heightRows});
				});
			});
		});
	});
});

app.get("/works", function(request, response) {
	var show_query = "SELECT * FROM Works";
	console.log(show_query);
	connection.query(show_query, function(error, workRows, fields) {
		
		var type_query = "SELECT DISTINCT type FROM Works";
		console.log(type_query);
		connection.query(type_query, function(error, typeRows, fields) {
			if (error) {
				console.log(error);
			}
			
			var width_query = "SELECT DISTINCT width FROM Works";
			console.log(width_query);
			connection.query(width_query, function(error, widthRows, fields) {
				if (error) {
					console.log(error);
				}
				
				var height_query = "SELECT DISTINCT height FROM Works";
				console.log(height_query);
				connection.query(height_query, function(error, heightRows, fields) {
					if (error) {
						console.log(error);
					}
				
					response.render("work/index", {works:workRows, workTypes:typeRows, widths:widthRows, heights:heightRows});
				});
			});
		});
	});
});

// new

app.get("/works/new", function(request, response) {
	response.render("work/new");
});

app.post("/works", function(request, response) {
	var new_query = "INSERT INTO Works (title, image, width, height, type, info) VALUES (";
	var data = "'" + request.body.title + "','" + request.body.image_url + "'," + request.body.width + "," + request.body.height + ",'" + request.body.type + "','" + request.body.info + "'";
	new_query = new_query + data + ")";
	console.log(new_query);
	connection.query(new_query, function(error, rows, fields) {
		if (error) {
			console.log(error);
		}
		
		response.redirect("/works");
	});
});

// show

app.get("/works/:id", function(request, response) {
	var show_query = "SELECT * FROM Works WHERE id='" + request.params.id + "'";
	console.log(show_query);
	connection.query(show_query, function(error, rows, fields) {
		response.render("work/show", {work:rows[0]});
	});
});

// edit

app.get("/works/:id/edit", function(request, response) {
	var edit_query = "SELECT * FROM Works WHERE id='" + request.params.id + "'";
	console.log(edit_query);
	connection.query(edit_query, function(error, rows, fields) {
		response.render("work/edit", {work:rows[0]});
	});
})

app.put("/works/:id", function(request, response) {
	var update_query = "UPDATE Works SET title='" + request.body.title + "', image='" + request.body.image_url + "', type='" + request.body.type + "', info='" + request.body.info + "' WHERE id='" + request.params.id + "'";
	console.log(update_query);
	connection.query(update_query, function(error, rows) {
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
	var delete_query = "DELETE FROM Works WHERE id=" + request.params.id;
	console.log(delete_query);
	connection.query(delete_query, function(error, rows, fields) {
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
