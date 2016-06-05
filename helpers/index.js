var helpers = {};

helpers.logQuery = function(query) {
	console.log(query);
	return query;
}

helpers.escapeSQLString = function(string) {
	var fixed_string = string.split("'").join("''");
	fixed_string = fixed_string.split("\\").join("\\\\");
	console.log("PRE FIX: " + string);
	console.log("POST FIX: " + fixed_string);
	return fixed_string;
};

module.exports = helpers;
