// Client Side

var cs = {
	"%20": " ",
	"%21": "!",
	"%22": '"',
	"%23": "#",
	"%26": "&",
	"%27": "'",
	"%3C": "<",
	"%3D": "=",
	"%3E": ">",
	"%5C": "\\",
	"%5E": "^",
	"%5B": "[",
	"%5D": "]",
	"%60": "`",
	"%3B": ";",
	"%7B": "{",
	"%7D": "}",
	"%7C": "|",
	"%40": "@",
	"%3A": ":",
	"%24": "$",
	"%2B": "+",
	"%7E": "~",
	"%3F": "?",
	"%2F": "/",
	"%28": "(",
	"%29": ")",
	"%2A": "*",
	"%3A": ":",
	"%2E": ".",
	"%25": "%",
	"%2D": "-",
	"%B4": ","
};

var decodeURL = function(url) {
	
	var pArray = url.split("?q=")[1];
	var ps = [];
	if (pArray != null) {
		pArray = pArray.split("=");
	} else {
		return ps;
	}
	
	pArray.forEach(function(p, i) {
		p = p.split("&")[0];
		
		for(v in cs) {
			p = p.split(v).join(cs[v]);
		}
		
		ps[i] = p;
	});
	
	return ps;
};

var encodeURLString = function(string) {
	for(v in cs) {
		string = string.split(cs[v]).join(v);
	}
	
	return string;
}

var stripURLChars = function(string) {
	for(v in cs) {
		string = string.split(cs[v]).join("");
	}
	
	return string;
}
