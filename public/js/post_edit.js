$(document).ready(function() {
	
	// UI Setup
	var postContent = document.getElementById("postContent");
	if (postContent != null) {
		postContent.innerHTML = document.getElementById("postContentData").innerText;
	}
	
	// Helper Methods
	var deselectImgs = function() {
		var imgs = document.querySelectorAll("img"); // get all imgs on the page. possible issue if there are imgs on the page but not in the editor
		
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src == $("#imgField").val()) {
				imgs[i].style.border = "2px solid black";
			}
		}
	};
	
	var selectImg = function(e) {
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
	};
	
	// Set up Squire
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
		
		// Font Dropdown Events
		
		$(".font-menu-button").click(function(e) {
			editor["setFontFace"](e.currentTarget.textContent);
		});
		
		// Font Size Field Events
		
		$("#fontSizeField").change(function(e) {
			editor.setFontSize(parseInt($("#fontSizeField").val()));
		});
		
		// Event Handlers for Squire
		$(".post-edit-button").click(function(e) {
			
			if (e.currentTarget.id === "boldButton") {
				
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
			
			e.preventDefault(); // stops the form from submitting
			return false;
		});
		
		editor.addEventListener("input", function() {
			document.getElementById("postContentArea").innerText = editor.getHTML(); // this ugly solution seems necessary to get the modified content back to the server
		});
		
		editor.addEventListener("pathChange", function() {
			$("#fontDropdownButton").val(editor.getFontInfo().family.split(",")[0]); // font.family has some other uneeded stuff on it so we just split that off
			$("#fontSizeField").val(parseInt(editor.getFontInfo().size.split("px")[0]));
		});
		
		editor.addEventListener("click", function(e) {
			deselectImgs();
			selectImg(e);
		}, false);
		
		$("#editForm").submit(function(e) {
			deselectImgs(); // deselect Imgs here so that the selection border doesn't get saved
		});
	});
	
});
