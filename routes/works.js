var express = require("express");
var db = require("../models/db");
var middleware = require("../middleware");
var router = express.Router();
var helpers = require("../helpers");

var connection = db.getConnection();

// WORKS AND GALLERY ROUTES

// index

router.get("/works/search", function(request, response) {
	var typeTerm = "%";
	if (request.query.f != "Type") {
		typeTerm = helpers.escapeSQLString(request.query.f);
	}
	
	var widthTerm = "%";
	if (request.query.w != "Width") {
		widthTerm = helpers.escapeSQLString(request.query.w.split("\"")[0]);
	}
	
	var heightTerm = "%";
	if (request.query.h != "Height") {
		heightTerm = helpers.escapeSQLString(request.query.h.split("\"")[0]);
	}
	
	var genreTerm = "%";
	if (request.query.g != "Genre") {
		genreTerm = helpers.escapeSQLString(request.query.g);
	}
	
	var tmpSoldQuery = "";
	if (request.query.s != "All") {
		tmpSoldQuery = "AND sold LIKE ";
		if (request.query.s == "Available") {
			tmpSoldQuery += "1";
		} else if (request.query.s == "Unavailable") {
			tmpSoldQuery += "0";
		}
		tmpSoldQuery = helpers.escapeSQLString(tmpSoldQuery);
	}
	
	var search_query = "SELECT * FROM Works WHERE title LIKE '%";
	search_query = search_query + helpers.escapeSQLString(request.query.q) + "%' ";
	search_query = search_query + "AND type LIKE '" + typeTerm + "' ";
	search_query = search_query + "AND width LIKE '" + widthTerm + "' ";
	search_query = search_query + "AND height LIKE '" + heightTerm + "' ";
	search_query = search_query + "AND genre LIKE '" + genreTerm + "' ";
	search_query = search_query + tmpSoldQuery;
	
	connection.query(helpers.logQuery(search_query), function(error, workRows, fields) {
		if (error) {
			console.log(error);
		}
		
		var type_query = "SELECT DISTINCT type FROM Works ORDER BY type ASC";
		connection.query(helpers.logQuery(type_query), function(error, typeRows, fields) {
			if (error) {
				console.log(error);
			}
			
			var width_query = "SELECT DISTINCT width FROM Works ORDER BY width DESC";
			connection.query(helpers.logQuery(width_query), function(error, widthRows, fields) {
				if (error) {
					console.log(error);
				}
				
				var height_query = "SELECT DISTINCT height FROM Works ORDER BY height DESC";
				connection.query(helpers.logQuery(height_query), function(error, heightRows, fields) {
					if (error) {
						console.log(error);
					}
					
					var genre_query = "SELECT DISTINCT genre FROM Works ORDER BY genre ASC";
					connection.query(helpers.logQuery(genre_query), function(error, genreRows, fields) {
						if (error) {
							console.log(error);
						}
				
						var sold_query = "SELECT DISTINCT sold FROM Works";
						connection.query(helpers.logQuery(sold_query), function(error, soldRows, fields) {
							if (error) {
								console.log(error);
							}
				
							response.render("work/index", {works:workRows, workTypes:typeRows, widths:widthRows, heights:heightRows, genres:genreRows, soldStatuses:soldRows});
						});
					});
				});
			});
		});
	});
});

router.get("/works", function(request, response) {
	var show_query = "SELECT * FROM Works";
	connection.query(helpers.logQuery(show_query), function(error, workRows, fields) {
		
		var type_query = "SELECT DISTINCT type FROM Works";
		connection.query(helpers.logQuery(type_query), function(error, typeRows, fields) {
			if (error) {
				console.log(error);
			}
			
			var width_query = "SELECT DISTINCT width FROM Works";
			connection.query(helpers.logQuery(width_query), function(error, widthRows, fields) {
				if (error) {
					console.log(error);
				}
				
				var height_query = "SELECT DISTINCT height FROM Works";
				connection.query(helpers.logQuery(height_query), function(error, heightRows, fields) {
					if (error) {
						console.log(error);
					}
				
					var genre_query = "SELECT DISTINCT genre FROM Works ORDER BY genre ASC";
					connection.query(helpers.logQuery(genre_query), function(error, genreRows, fields) {
						if (error) {
							console.log(error);
						}
						
						var sold_query = "SELECT DISTINCT sold FROM Works";
						connection.query(helpers.logQuery(sold_query), function(error, soldRows, fields) {
							if (error) {
								console.log(error);
							}
				
							response.render("work/index", {works:workRows, workTypes:typeRows, widths:widthRows, heights:heightRows, genres:genreRows, soldStatuses:soldRows});
						});
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
	
	var forSale = 0;
	if (request.body.sold == "on") {
		forSale = 1;
	}
	
	var new_query = "INSERT INTO Works (title, image, width, height, type, info, genre, sold) VALUES (";
	var data = "'" +
	helpers.escapeSQLString(request.body.title) + "','" +
	helpers.escapeSQLString(request.body.image_url) + "'," +
	helpers.escapeSQLString(request.body.width) + "," +
	helpers.escapeSQLString(request.body.height) + ",'" +
	helpers.escapeSQLString(request.body.type) + "','" +
	helpers.escapeSQLString(request.body.info) + "','" +
	helpers.escapeSQLString(request.body.genre) + "'," +
	forSale;
	
	new_query = new_query + data + ")";
	connection.query(helpers.logQuery(new_query), function(error, rows, fields) {
		if (error) {
			console.log(error);
		}
		
		response.redirect("/works");
	});
});

// show

router.get("/works/:id", function(request, response) {
	var show_query = "SELECT * FROM Works WHERE id='" + helpers.escapeSQLString(request.params.id) + "'";
	connection.query(helpers.logQuery(show_query), function(error, rows, fields) {
		response.render("work/show", {work:rows[0]});
	});
});

// edit

router.get("/works/:id/edit", middleware.isLoggedIn, function(request, response) {
	var edit_query = "SELECT * FROM Works WHERE id='" + helpers.escapeSQLString(request.params.id) + "'";
	connection.query(helpers.logQuery(edit_query), function(error, rows, fields) {
		response.render("work/edit", {work:rows[0]});
	});
})

router.put("/works/:id", middleware.isLoggedIn, function(request, response) {
	
	var forSale = 0;
	if (request.body.sold == "on") {
		forSale = 1;
	}
	
	var update_query = "UPDATE Works SET " +
	"title='" + helpers.escapeSQLString(request.body.title) +
	"', image='" + helpers.escapeSQLString(request.body.image_url) +
	"', type='" + helpers.escapeSQLString(request.body.type) +
	"', info='" + helpers.escapeSQLString(request.body.info) +
	"', genre='" + helpers.escapeSQLString(request.body.genre) +
	"', sold=" + forSale +
	" WHERE id='" + helpers.escapeSQLString(request.params.id) + "'";
	
	connection.query(helpers.logQuery(update_query), function(error, rows) {
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
	var delete_query = "DELETE FROM Works WHERE id=" + helpers.escapeSQLString(request.params.id);
	connection.query(helpers.logQuery(delete_query), function(error, rows, fields) {
		response.redirect("/works");
	});
});

module.exports = router;
