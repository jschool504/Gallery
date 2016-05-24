var express = require("express");
var db = require("../models/db");
var middleware = require("../middleware");
var router = express.Router();

var connection = db.getConnection();

// WORKS AND GALLERY ROUTES

// index

router.get("/works/search", function(request, response) {
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
	
	var genreTerm = "%";
	if (request.query.g != "Any") {
		genreTerm = request.query.g;
	}
	
	var search_query = "SELECT * FROM Works WHERE title LIKE '%";
	search_query = search_query + request.query.q + "%' ";
	search_query = search_query + "AND type LIKE '" + searchTerm + "' ";
	search_query = search_query + "AND width LIKE '" + widthTerm + "' ";
	search_query = search_query + "AND height LIKE '" + heightTerm + "'";
	search_query = search_query + "AND genre LIKE '" + genreTerm + "'";
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
					
					var genre_query = "SELECT DISTINCT genre FROM Works ORDER BY genre ASC";
					console.log(genre_query);
					connection.query(genre_query, function(error, genreRows, fields) {
						if (error) {
							console.log(error);
						}
				
						response.render("work/index", {works:workRows, workTypes:typeRows, widths:widthRows, heights:heightRows, genres:genreRows});
					});
				});
			});
		});
	});
});

router.get("/works", function(request, response) {
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
				
					var genre_query = "SELECT DISTINCT genre FROM Works ORDER BY genre ASC";
					console.log(genre_query);
					connection.query(genre_query, function(error, genreRows, fields) {
						if (error) {
							console.log(error);
						}
				
						response.render("work/index", {works:workRows, workTypes:typeRows, widths:widthRows, heights:heightRows, genres:genreRows});
					});
				});
			});
		});
	});
});

// new

router.get("/works/new", middleware.isLoggedIn, function(request, response) {
	response.render("work/new");
});

router.post("/works", middleware.isLoggedIn, function(request, response) {
	var new_query = "INSERT INTO Works (title, image, width, height, type, info, genre) VALUES (";
	var data = "'" + request.body.title + "','" + request.body.image_url + "'," + request.body.width + "," + request.body.height + ",'" + request.body.type + "','" + request.body.info + "','" + request.body.genre + "'";
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

router.get("/works/:id", function(request, response) {
	var show_query = "SELECT * FROM Works WHERE id='" + request.params.id + "'";
	console.log(show_query);
	connection.query(show_query, function(error, rows, fields) {
		response.render("work/show", {work:rows[0]});
	});
});

// edit

router.get("/works/:id/edit", middleware.isLoggedIn, function(request, response) {
	var edit_query = "SELECT * FROM Works WHERE id='" + request.params.id + "'";
	console.log(edit_query);
	connection.query(edit_query, function(error, rows, fields) {
		response.render("work/edit", {work:rows[0]});
	});
})

router.put("/works/:id", middleware.isLoggedIn, function(request, response) {
	var update_query = "UPDATE Works SET title='" + request.body.title + "', image='" + request.body.image_url + "', type='" + request.body.type + "', info='" + request.body.info + "', genre='" + request.body.genre + "' WHERE id='" + request.params.id + "'";
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

router.delete("/works/:id", middleware.isLoggedIn, function(request, response) {
	var delete_query = "DELETE FROM Works WHERE id=" + request.params.id;
	console.log(delete_query);
	connection.query(delete_query, function(error, rows, fields) {
		response.redirect("/works");
	});
});

module.exports = router;
