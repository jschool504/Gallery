$(document).ready(function() {

	var searchParam = location.href.split("?q=")[1];
	if (searchParam != null) {
		$("#searchField").val(searchParam.split("&")[0].split("%27").join("'"));
	}

	var typeParam = location.href.split("&f=")[1];
	if (typeParam != null) {
		typeParam = typeParam.split("&")[0].split("%20")[0];
		$("#typeDropButton").val(typeParam);
	}

	var genreParam = location.href.split("&g=")[1];
	if (genreParam != null) {
		genreParam = genreParam.split("&")[0].split("%20").join(" ");
		$("#genreDropdownButton").val(genreParam);
	}

	var widthParam = location.href.split("&w=")[1];
	if (widthParam != null) {
		widthParam = widthParam.split("&")[0].split("%22")[0];
		if (widthParam != "Width") {
			widthParam = widthParam.split("&") + "\"";
		}
		$("#widthDropdownButton").val(widthParam);
	}

	var heightParam = location.href.split("&h=")[1];
	if (heightParam != null) {
		heightParam = heightParam.split("&")[0].split("%22")[0];
		if (heightParam != "Height") {
			heightParam = heightParam.split("&") + "\"";
		}
		$("#heightDropdownButton").val(heightParam);
	}

	var soldParam = location.href.split("&s=")[1];
	if (soldParam != null) {
		$("#soldDropdownButton").val(soldParam);
	}
	
	var search = function() {
		location.href = "/works/search?q=" + $("#searchField").val() +
			"&f=" + $("#typeDropButton").val() +
			"&g=" + $("#genreDropdownButton").val() +
			"&w=" + $("#widthDropdownButton").val() +
			"&h=" + $("#heightDropdownButton").val() +
			"&s=" + $("#soldDropdownButton").val()
	};

	// Event Handlers
	$("#searchButton").click(function() {
		search();
	});

	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			search();
		}
	});
});
