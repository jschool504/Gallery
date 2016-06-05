var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require("passport-local");
var app = express();
var helpers = require("./helpers");

var db = require("./models/db");
db.createConnection();
connection = db.getConnection();

// ROUTE REQUIRES

var workRoutes = require("./routes/works");
var postRoutes = require("./routes/posts");
var indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

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
		var find_user_query = "SELECT * FROM Users WHERE Users.name = '" + username + "' LIMIT 1";
		connection.query(helpers.logQuery(find_user_query), function(error, rows, fields) {
			if (error) {
				return done(error);
			}
			
			user = rows[0];
			
			if (user == null) {
				return done(null, false, {message: "I think that's the wrong username :-("});
			}
			
			if (!bcrypt.compareSync(password, user.password)) {
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
	var find_user_query = "SELECT * FROM Users WHERE Users.id = " + id;
	connection.query(helpers.logQuery(find_user_query), function(error, rows, fields) {
		return done(error, rows[0]);
	});
});

app.use(function(request, response, next) {
	response.locals.currentUser = request.user;
	next();
});

// SETUP ROUTES

app.use(workRoutes);
app.use(postRoutes);
app.use(indexRoutes);

// LISTENING

app.listen(process.env.PORT || 80, function() {
	console.log("Gallery is running...");
});
