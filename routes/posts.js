var express = require("express");
var db = require("../models/db");
var middleware = require("../middleware");
var router = express.Router();

var connection = db.getConnection();

// POSTS INDEX

// index

router.get("/posts/search", function(request, response) {
	
	var categoryTerm = "%";
	if (request.query.c != "All") {
		categoryTerm = request.query.c;
	}
	
	var searchTerm = "%";
	if (request.query.q != null) {
		searchTerm = request.query.q;
	}
	
	var search_query = "SELECT * FROM Posts WHERE title LIKE '%" +
	searchTerm + "%' AND category LIKE '" + categoryTerm +
	"' ORDER BY date DESC";
	
	console.log(search_query);
	connection.query(search_query, function(error, searchRows, fields) {
		if (error) {
			console.log(error);
		}
		
		var category_query = "SELECT DISTINCT category FROM Posts ORDER BY category ASC";
		console.log(category_query);
		connection.query(category_query, function(error, categoryRows, fields) {
			if (error) {
				console.log(error);
			}
			
			response.render("post/index", {posts:searchRows, postCategories:categoryRows});
		});
	});
});

router.get("/posts", function(request, response) {
	
	
	var post_query = "SELECT * FROM Posts ORDER BY date DESC";
	console.log(post_query);
	connection.query(post_query, function(error, postRows, fields) {
		
		var category_query = "SELECT DISTINCT category FROM Posts ORDER BY category ASC";
		console.log(category_query);
		connection.query(category_query, function(error, categoryRows) {
		
			response.render("post/index", {posts:postRows, postCategories:categoryRows});
		
		});
	});
});

// add

router.get("/posts/new", middleware.isLoggedIn, function(request, response) {
	response.render("post/new");
});

router.post("/posts", middleware.isLoggedIn, function(request, response) {
	connection.query("INSERT INTO Posts (title, date, content, category) VALUES ('" +
	request.body.title + "','" + request.body.date + "','" +
	request.body.content + "','" + request.body.category + "')",
	function(error, rows, fields) {
		response.redirect("/posts");
	});
});

// edit

router.get("/posts/:id/edit", middleware.isLoggedIn, function(request, response) {
	connection.query("SELECT * FROM Posts WHERE id=" + request.params.id, function(error, rows, fields) {
		response.render("post/edit", {post:rows[0]});
	});
})

router.put("/posts/:id", middleware.isLoggedIn, function(request, response) {
	connection.query("UPDATE Posts SET title='" + request.body.title +
	"',date='" + request.body.date +
	"',content='" + request.body.content +
	"',category='" + request.body.category +
	"' WHERE id=" + request.params.id, function(error, rows, fields) {
		if (error) {
			response.redirect("/posts/" + rows[0].id + "/edit", {post:rows[0]});
			console.log(error);
		}
		response.redirect("/posts/" + request.params.id);
	});
});

// delete

router.delete("/posts/:id", middleware.isLoggedIn, function(request, response) {
	connection.query("DELETE FROM Posts WHERE id=" + request.params.id, function(error, rows, fields) {
		response.redirect("/posts");
	});
});

// show

router.get("/posts/:id", function(request, response) {
	connection.query("SELECT * FROM Posts WHERE id=" + request.params.id, function(error, rows, fields) {
		response.render("post/show", {post:rows[0]});
	});
});

module.exports = router;
