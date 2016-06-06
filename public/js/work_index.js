$(document).ready(function() {
	
	// UI Updaters
	var paramsArray = location.href.split("?q=")[1];
	paramsArray = paramsArray.split("=");
	var params = [];
	
	// Convert url params to something humans can read
	var chars = {
		"%20": " ",
		"%21": "!",
		"%22": '"',
		"%23": "#",
		"%27": "'"
	};
	
	paramsArray.forEach(function(param, index) {
		param = param.split("&")[0];
		
		for(value in chars) {
			param = param.split(value).join(chars[value]);
		}
		
		params[index] = param;
	});
	
	console.log(params);
	
	if (params[0] != null) { // check if null just incase someone GETS an incorrect url
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
	
	$(".dropdown-content button").click(function(e) {
		search();
	});
});
