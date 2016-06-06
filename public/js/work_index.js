$(document).ready(function() {
	// search function
	var search_works = function() {
		location.href = "/works/search?q=" + encodeURLString($("#searchField").val()) + //convert weird characters to URL friendly ones
			//strip characters from these because we know they shouldn't have such options anyway
			"&f=" + stripURLChars($("#typeDropButton").val()) +
			"&g=" + stripURLChars($("#genreDropdownButton").val()) +
			"&w=" + stripURLChars($("#widthDropdownButton").val()) +
			"&h=" + stripURLChars($("#heightDropdownButton").val()) +
			"&s=" + stripURLChars($("#soldDropdownButton").val())
	};
	
	// UI Updaters
	var params = decodeURL(location.href); // from utils.js
	
	if (params[0] != null) {
		$("#searchField").val(params[0]);
	}
	
	if (params[1] != null) {
		$("#typeDropButton").val(params[1]);
	}
	
	if (params[2] != null) {
		$("#genreDropdownButton").val(params[2]);
	}
	
	if (params[3] != null) {
		$("#widthDropdownButton").val(params[3]);
	}
	
	if (params[4] != null) {
		$("#heightDropdownButton").val(params[4]);
	}

	if (params[5] != null) {
		$("#soldDropdownButton").val(params[5]);
	}

	// Event Handlers
	$("#searchButton").click(function() {
		search_works();
	});

	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			search_works();
		}
	});
	
	$(".dropdown-content button").click(function(e) {
		search_works();
	});
});
