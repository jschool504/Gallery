$(document).ready(function() {
	
	// UI Setup
	var postContent = document.getElementById("postContent");
	if (postContent != null) {
		postContent.innerHTML = document.getElementById("postContentData").innerText;
	}
	
	// Set up Squire
	$("#postContentEditor").ready(function() {
		var saved_selection = null;
		
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
		
		// Font Dropdown Events
		
		$(document).click(function() {
			$("#fontDropdownContent").hide();
		});
		
		$("#fontDropdownButton").click(function(e) {
			e.stopPropagation();
			$("#fontDropdownContent").show();
		});
		
		$(".font-menu-button").click(function(e) {
			e.stopPropagation();
			$("#fontDropdownContent").hide();
			$("#fontDropdownButton").val(e.currentTarget.textContent);
			editor["setFontFace"](e.currentTarget.textContent);
		});
		
		// Font Size Field Events
		
		$("#fontSizeField").change(function(e) {
			editor.setFontSize(parseInt($("#fontSizeField").val()));
		});
		
		// Event Handlers for Squire
		$(".post-edit-button").click(function(e) {
			var action;
			var value;
			
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
				$("img").each(function(idx, img) {
					if (document.getElementById("imgField").value == img.src) {
						img.width = $("#imgWidthField").val();
						img.height = $("#imgHeightField").val();
					} else if (document.getElementById("imgField").value == "") {
						editor.insertImage($("#imgField").val());
					}
				});
			} else if (e.currentTarget.id == "imgFloatRightButton") {
				$("img").each(function(idx, img) {
					if (document.getElementById("imgField").value == img.src) {
						img.style.float = "right";
						img.style.margin = "0";
						img.style.marginLeft = "10px";
					}
				});
			} else if (e.currentTarget.id == "imgUnfloatButton") {
				$("img").each(function(idx, img) {
					if (document.getElementById("imgField").value == img.src) {
						img.style.float = "none";
						img.style.margin = "0";
						img.style.marginRight = "10px";
					}
				});
			} else if (e.currentTarget.id == "imgFloatLeftButton") {
				$("img").each(function(idx, img) {
					if (document.getElementById("imgField").value == img.src) {
						img.style.float = "left";
						img.style.margin = "0";
						img.style.marginRight = "10px";
					}
				});
			} else if (e.currentTarget.id == "linkButton") {
				editor["makeLink"]($("#linkField").val());
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
		
		editor.addEventListener("pathChange", function() {
			$("#fontDropdownButton").val(editor.getFontInfo().family.split(",")[0]);
			$("#fontSizeField").val(parseInt(editor.getFontInfo().size.split("px")[0]));
		});
		
		editor.addEventListener("click", function(e) {
			var imgs = document.querySelectorAll("img");
			
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].src == $("#imgField").val()) {
					imgs[i].style.border = "2px solid black";
				}
			}
			
			if (e.target.nodeName == "IMG") {
				$("#imgField").val(e.target.src);
				$("#imgWidthField").val(e.target.width + 4); // +4 to adjust for border
				$("#imgHeightField").val(e.target.height + 4);
				e.target.style.border = "2px dashed black";
			} else {
				$("#imgField").val("");
				$("#imgWidthField").val("");
				$("#imgHeightField").val("");
			}
			
		}, false);
	});
	
});
