// General Dropdown Events

$(document).ready(function() {
	$(".dropdown-content").click(function(e) {
		e.stopPropagation();
	});
	
	$(document).click(function(e) {
		var dropdownContents = document.querySelectorAll(".dropdown-content");
		
		// loop through all .dropdown-contents and hide them if they are open
		for (var i = 0; i < dropdownContents.length; i++) {
			if (dropdownContents[i].style.display == "block") {
				dropdownContents[i].style.display = "none";
			}
		}
	});
	
	$(".dropbtn").click(function(e) {
		e.stopPropagation();
		e.target.nextElementSibling.style.display = "block";
	});
	
	$(".dropdown-content button").click(function(e) {
		e.target.parentElement.previousElementSibling.value = e.target.textContent;
		e.target.parentElement.style.display = "none";
	});
});
