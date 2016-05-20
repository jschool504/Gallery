$(document).ready(function() {
	$("#searchButton").click(function() {
		location.href = "/works/search?q=" + $("#searchField").val();
	});
	
	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			location.href = "/works/search?q=" + $("#searchField").val();
		}
	});
});
