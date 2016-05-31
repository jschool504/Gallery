$(document).ready(function() {
	
	var searchParam = location.href.split("?q=")[1];
	if (searchParam != null) {
		$("#postSearchField").val(searchParam.split("&")[0]);
	} else {
		searchParam = "";
	}
	
	var categoryParam = location.href.split("&c=")[1];
	if (categoryParam != null) {
		console.log(categoryParam);
		categoryParam = categoryParam = categoryParam.split("%20").join("");
		$("#" + categoryParam).addClass("dropbtnSelected");
	} else {
		categoryParam = "All";
		$("#All").addClass("dropbtnSelected");
	}
	
	//Event Handlers
	$("#postSearchButton").click(function() {
		location.href = "/posts/search?q=" + $("#postSearchField").val() + "&c=" + categoryParam;
	});

	$("#postSearchField").keyup(function(e) {
		if (e.keyCode == 13) {
			location.href = "/posts/search?q=" + $("#postSearchField").val() + "&c=" + categoryParam;
		}
	});
	
	$(".dropbtn").click(function(e) {
		location.href = "/posts/search?q=" + $("#postSearchField").val() + "&c=" + e.currentTarget.textContent;
	});
});
