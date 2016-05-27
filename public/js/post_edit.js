$(document).ready(function() {
	
	//UI Setup
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
	
});
