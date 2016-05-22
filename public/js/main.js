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
	
	$("#postContent").ready(function() {
		if($("#postContent")[0] != null) {
			var postText = $("#postContent")[0].innerText;
			$("#postContent")[0].innerHTML = postText;
		}
	});
	
	$("#edit-panel").keyup(function(e) {
		$("#postContent")[0].innerHTML = $("#editContent").val();
	});
	
	//Event Handlers
	$("#searchButton").click(function() {
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#dropButton").val();
	});
	
	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#dropButton").val();
		}
	});
	
	$(document).click(function() {
		console.log("hi");
		$("#dropContent").hide();
	});
	
	$("#dropContent").click(function(e) {
		e.stopPropagation();
	});
	
	$("#dropButton").click(function(e) {
		e.stopPropagation();
		$("#dropContent").toggle();
	});
	
	$(".filter-button").click(function(e) {
		$("#dropButton").val(e.currentTarget.textContent);
		$("#dropContent").toggle();
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + e.currentTarget.textContent;
	});
});
