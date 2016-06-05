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

	// General Dropdown Events

	$(".dropdown-content").click(function(e) {
		e.stopPropagation();
	});

	// Type dropdown

	$(document).click(function() {
		$("#typeDropdownContent").hide(); //hide when u click off of the dropdown
	});

	$("#typeDropButton").click(function(e) {
		e.stopPropagation(); // stops the click event from propagating to higher level objects
		$("#typeDropdownContent").show(); 
	});

	$(".type-menu-button").click(function(e) {
		$("#typeDropButton").val(e.currentTarget.textContent);
		$("#typeDropdownContent").toggle();
		search();
	});

	// Genre dropdown

	$(document).click(function() {
		$("#genreDropdownContent").hide();
	});

	$("#genreDropdownButton").click(function(e) {
		e.stopPropagation();
		$("#genreDropdownContent").show();
	});

	$(".genre-menu-button").click(function(e) {
		$("#genreDropdownButton").val(e.currentTarget.textContent);
		$("#genreDropdownContent").toggle();
		search();
	});

	// Width dropdown

	$(document).click(function() {
		$("#widthDropdownContent").hide();
	});

	$("#widthDropdownButton").click(function(e) {
		e.stopPropagation();
		$("#widthDropdownContent").show();
	});

	$(".width-menu-button").click(function(e) {
		$("#widthDropdownButton").val(e.currentTarget.textContent);
		$("#widthDropdownContent").toggle();
		search();
	});

	// Height dropdown

	$(document).click(function() {
		$("#heightDropdownContent").hide();
	});

	$("#heightDropdownButton").click(function(e) {
		e.stopPropagation();
		$("#heightDropdownContent").show();
	});

	$(".height-menu-button").click(function(e) {
		$("#heightDropdownButton").val(e.currentTarget.textContent);
		$("#heightDropdownContent").toggle();
		search();
	});

	// Sold dropdown

	$(document).click(function() {
		$("#soldDropdownContent").hide();
	});

	$("#soldDropdownButton").click(function(e) {
		e.stopPropagation();
		$("#soldDropdownContent").show();
	});

	$(".sold-menu-button").click(function(e) {
		$("#soldDropdownButton").val(e.currentTarget.textContent);
		$("#soldDropdownContent").toggle();
		search();
	});
});
