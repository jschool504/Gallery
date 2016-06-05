var express = require("express");
var db = require("../models/db");
var middleware = require("../middleware");
var router = express.Router();
var helpers = require("../helpers");

var connection = db.getConnection();

// POSTS INDEX

// index

router.get("/posts/search", function(request, response) {
	
	var categoryTerm = "%";
	if (request.query.c != "All") {
		categoryTerm = helpers.escapeSQLString(request.query.c);
	}
	
	var searchTerm = "%";
	if (request.query.q != null) {
		searchTerm = helpers.escapeSQLString(request.query.q);
	}
	
	var showAll = "1";
	
	if (response.locals.currentUser) {
		showAll = "1 OR display=0";
	}
	
	var search_query = "SELECT * FROM Posts WHERE title LIKE '%" +
	searchTerm + "%' AND category LIKE '" + categoryTerm + "' AND display=" + showAll +
	" ORDER BY date DESC";
	
	connection.query(helpers.logQuery(search_query), function(error, searchRows, fields) {
		if (error) {
			console.log(error);
		}
		
		var category_query = "SELECT DISTINCT category FROM Posts WHERE display=" + showAll + " ORDER BY category ASC";
		connection.query(helpers.logQuery(category_query), function(error, categoryRows, fields) {
			if (error) {
				console.log(error);
			}
			
			response.render("post/index", {posts:searchRows, postCategories:categoryRows});
		});
	});
});

router.get("/posts", function(request, response) {
	
	var showAll = "1";
	
	if (response.locals.currentUser) {
		showAll = "1 OR display=0";
	}
	
	var post_query = "SELECT * FROM Posts WHERE display=" + showAll + " ORDER BY date DESC";
	connection.query(helpers.logQuery(post_query), function(error, postRows, fields) {
		
		if (error) {
			console.log(error);
		}
		
		var category_query = "SELECT DISTINCT category FROM Posts WHERE display=" + showAll + " ORDER BY category ASC";
		connection.query(helpers.logQuery(category_query), function(error, categoryRows) {
			
			if (error) {
				console.log(error);
			}
			
			response.render("post/index", {posts:postRows, postCategories:categoryRows});
		
		});
	});
});

// add

router.get("/posts/new", middleware.isLoggedIn, function(request, response) {
	response.render("post/new");
});

router.post("/posts", middleware.isLoggedIn, function(request, response) {
	var displayStatus = 0;
	if (request.body.display == "on") {
		displayStatus = 1;
	}
	
	var add_query = "INSERT INTO Posts (title, date, content, category, display) VALUES ('" +
	helpers.escapeSQLString(request.body.title) + "','" + helpers.escapeSQLString(request.body.date) + "','" +
	helpers.escapeSQLString(request.body.content) + "','" + helpers.escapeSQLString(request.body.category) + "'," + displayStatus + ")";
		
	connection.query(helpers.logQuery(add_query), function(error, rows, fields) {
		if (error) {
			console.log(error);
		}
		
		response.redirect("/posts");
	});
});

// edit

router.get("/posts/:id/edit", middleware.isLoggedIn, function(request, response) {
	var edit_query = "SELECT * FROM Posts WHERE id=" + helpers.escapeSQLString(request.params.id);
	connection.query(helpers.logQuery(edit_query), function(error, rows, fields) {
		if (error) {
			console.log(error);
		}
		
		response.render("post/edit", {post:rows[0]});
	});
})

router.put("/posts/:id", middleware.isLoggedIn, function(request, response) {
	var displayStatus = 0;
	if (request.body.display == "on") {
		displayStatus = 1;
	}
	
	var update_query = "UPDATE Posts SET title='" + helpers.escapeSQLString(request.body.title) +
	"',date='" + helpers.escapeSQLString(request.body.date) +
	"',content='" + helpers.escapeSQLString(request.body.content) +
	"',category='" + helpers.escapeSQLString(request.body.category) +
	"',display=" + displayStatus +
	" WHERE id=" + helpers.escapeSQLString(request.params.id);
	
	connection.query(helpers.logQuery(update_query), function(error, rows, fields) {
		if (error) {
			console.log(error);
			response.redirect("/posts/");
		} else {
			response.redirect("/posts/" + request.params.id);
		}
	});
});

// delete

router.delete("/posts/:id", middleware.isLoggedIn, function(request, response) {
	var delete_query = "DELETE FROM Posts WHERE id=" + request.params.id;
	connection.query(helpers.logQuery(delete_query), function(error, rows, fields) {
		if (error) {
			console.log(error);
		}
		
		response.redirect("/posts");
	});
});

// show

router.get("/posts/:id", function(request, response) {
	var show_query = "SELECT * FROM Posts WHERE id=" + helpers.escapeSQLString(request.params.id);
	connection.query(helpers.logQuery(show_query), function(error, rows, fields) {
		if (error) {
			console.log(error);
		} else if (response.locals.currentUser == null && rows[0].display != 1) {
			response.send("Sorry you don't have permission to view that :-(");
		} else {
			response.render("post/show", {post:rows[0]});
		}
	});
});

module.exports = router;
