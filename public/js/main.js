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
	
	/*
	$("#edit-panel").keyup(function(e) {
		$("#postContent")[0].innerHTML = $("#editContent").val();
	});
	*/
	
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
