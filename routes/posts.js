var express = require("express");
var db = require("../models/db");
var middleware = require("../middleware");
var router = express.Router();

var connection = db.getConnection();

// POSTS INDEX

// index

router.get("/posts", function(request, response) {
	connection.query("SELECT * FROM Posts", function(error, rows, fields) {
		response.render("post/index", {posts:rows});
	})
})

// add

router.get("/posts/new", middleware.isLoggedIn, function(request, response) {
	response.render("post/new");
});

router.post("/posts", middleware.isLoggedIn, function(request, response) {
	connection.query("INSERT INTO Posts (title, date, content) VALUES ('" + request.body.title + "','" + request.body.date + "','" + request.body.content + "')", function(error, rows, fields) {
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
	console.log(request.body.content);
	connection.query("UPDATE Posts SET title='" + request.body.title + "',date='" + request.body.date + "',content='" + request.body.content + "' WHERE id=" + request.params.id, function(error, rows, fields) {
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
