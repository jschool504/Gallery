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
	
	var genreParam = location.href.split("&g=")[1];
	if (genreParam != null) {
		genreParam = genreParam.split("&")[0].split("%20").join(" ");
		$("#genreDropdownButton").val(genreParam);
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
		heightParam = heightParam.split("&")[0].split("%22")[0];
		if (heightParam != "Any") {
			heightParam = heightParam.split("&") + "\"";
		}
		$("#heightDropdownButton").val(heightParam);
	}
	
	var soldParam = location.href.split("&s=")[1];
	if (soldParam != null) {
		$("#soldDropdownButton").val(soldParam);
	}
	
	var postContent = document.getElementById("postContent");
	if (postContent != null) {
		postContent.innerHTML = document.getElementById("postContentData").innerText;
	}
	
	//Set up Squire
	$("#postContentEditor").ready(function() {
		var div_editor = document.getElementById("postContentEditor");
		editor = new Squire(div_editor, {
			blockTag: "p",
			blockAttributes: {"class": "paragraph"},
			tagAttributes: {
				ul: {"class": "UL"},
				ol: {"class": "OL"},
				li: {"class": "listItem"},
				a:  {"class": "_blank"}
			}
		});
		
		console.log(document.getElementById("postContentArea").innerText);
		
		editor.setHTML(document.getElementById("postContentArea").innerText);
		//$("#postContentDiv").remove();
		
		//Event Handlers for Squire
		$(".post-edit-button").click(function(e) {
			var action;
			var value;
			console.log(editor.getPath());
			if (e.currentTarget.id === "boldButton") {
				if (editor.hasFormat("b")) {
					editor["removeBold"]();
				} else {
					editor["bold"]();
				}
			} else if (e.currentTarget.id == "italicButton") {
				if (editor.hasFormat("i")) {
					editor["removeItalic"]();
				} else {
					editor["italic"]();
				}
			} else if (e.currentTarget.id == "underlineButton") {
				if (editor.hasFormat("u")) {
					editor["removeUnderline"]();
				} else {
					editor["underline"]();
				}
			} else if (e.currentTarget.id == "imgButton") {
				
			} else if (e.currentTarget.id == "fontButton") {
				
			} else if (e.currentTarget.id == "linkButton") {
			
			} else if (e.currentTarget.id == "leftAlignButton") {
				editor.setTextAlignment("left");
			} else if (e.currentTarget.id == "centerAlignButton") {
				editor.setTextAlignment("center");
			} else if (e.currentTarget.id == "rightAlignButton") {
				editor.setTextAlignment("right");
			}
			
			e.preventDefault();
			return false;
		});
		
		editor.addEventListener("input", function() {
			document.getElementById("postContentArea").innerText = editor.getHTML();
		});
	});
	
	var search = function() {
		location.href = "/works/search?q=" + $("#searchField").val() +
		"&f=" + $("#typeDropButton").val() +
		"&g=" + $("#genreDropdownButton").val() +
		"&w=" + $("#widthDropdownButton").val() +
		"&h=" + $("#heightDropdownButton").val() +
		"&s=" + $("#soldDropdownButton").val()
	};
	
	//Event Handlers
	$("#searchButton").click(function() {
		search();
	});
	
	$("#searchField").keyup(function(e) {
		if (e.keyCode == 13) {
			search();
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
		search();
	});
	
	//Genre dropdown
	
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
		search();
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
		search();
	});
	
	//Sold dropdown
	
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
