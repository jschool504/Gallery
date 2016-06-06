$(document).ready(function() {
	//search function
	var search_posts = function(searchTerm, categoryTerm) {
		location.href = "/posts/search?q=" + searchTerm + "&c=" + categoryTerm;
	}
	
	var params = decodeURL(location.href);
	
	if (params[0] != null) {
		$("#postSearchField").val(params[0]);
	}
	
	if (params[1] == "") {
		params[1] = "All";
	}
	
	console.log(params);
	
	$("#" + params[1]).addClass("category-button-selected");
	
	//Event Handlers
	$("#postSearchButton").click(function() {
		search_posts($("#postSearchField").val(), document.querySelectorAll(".category-button-selected")[0].textContent);
	});

	$("#postSearchField").keyup(function(e) {
		if (e.keyCode == 13) {
			search_posts($("#postSearchField").val(), document.querySelectorAll(".category-button-selected")[0].textContent);
		}
	});
	
	$(".category-button").click(function(e) {
		search_posts($("#postSearchField").val(), e.target.textContent);
	});
});
