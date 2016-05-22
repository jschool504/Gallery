$(document).ready(function() {
	//UI Setup
	var filterParam = location.href.split("&f=")[1];
	if (filterParam != null) {
		$("#dropButton").val(filterParam.split("%20").join(" "));
	}
	
	var searchParam = location.href.split("?q=")[1];
	if (searchParam != null) {
		$("#searchField").val(searchParam.split("&")[0]);
	}
	
	//Event Handlers
	$("#searchButton").click(function() {
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#dropButton").val();
	});
	
	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#dropButton").val();
		}
	});
	
	$("#dropButton").click(function() {
		$("#dropContent").toggle();
	});
	
	$(".filter-button").click(function(e) {
		$("#dropButton").val(e.currentTarget.textContent);
		$("#dropContent").toggle();
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + e.currentTarget.textContent;
	});
});
