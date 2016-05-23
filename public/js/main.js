$(document).ready(function() {
	//UI Setup
	var searchParam = location.href.split("?q=")[1];
	if (searchParam != null) {
		$("#searchField").val(searchParam.split("&")[0]);
	}
	
	var typeParam = location.href.split("&f=")[1];
	if (typeParam != null) {
		typeParam = typeParam.split("&")[0].split("%20")[0];
		$("#typeDropButton").val(typeParam);
	}
	
	var widthParam = location.href.split("&w=")[1];
	if (widthParam != null) {
		widthParam = widthParam.split("&")[0].split("%22")[0];
		if (widthParam != "Any") {
			widthParam = widthParam.split("&") + "\"";
		}
		$("#widthDropdownButton").val(widthParam);
	}
	
	var heightParam = location.href.split("&h=")[1];
	if (heightParam != null) {
		heightParam = heightParam.split("%22")[0];
		if (heightParam != "Any") {
			heightParam = heightParam.split("&") + "\"";
		}
		$("#heightDropdownButton").val(heightParam);
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
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#typeDropButton").val() + "&w=" + $("#widthDropdownButton").val() + "&h=" + $("#heightDropdownButton").val();
	});
	
	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#typeDropButton").val() + "&w=" + $("#widthDropdownButton").val() + "&h=" + $("#heightDropdownButton").val();
		}
	});
	
	//General Dropdown Events
	
	$(".dropdown-content").click(function(e) {
		e.stopPropagation();
	});
	
	//Type dropdown
	
	$(document).click(function() {
		$("#typeDropdownContent").hide();
	});
	
	$("#typeDropButton").click(function(e) {
		e.stopPropagation();
		$("#typeDropdownContent").show();
	});
	
	$(".type-menu-button").click(function(e) {
		$("#typeDropButton").val(e.currentTarget.textContent);
		$("#typeDropdownContent").toggle();
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#typeDropButton").val() + "&w=" + $("#widthDropdownButton").val() + "&h=" + $("#heightDropdownButton").val();
	});
	
	//Width dropdown
	
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
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#typeDropButton").val() + "&w=" + $("#widthDropdownButton").val() + "&h=" + $("#heightDropdownButton").val();
	});
	
	//Height dropdown
	
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
		location.href = "/works/search?q=" + $("#searchField").val() + "&f=" + $("#typeDropButton").val() + "&w=" + $("#widthDropdownButton").val() + "&h=" + $("#heightDropdownButton").val();
	});
});
