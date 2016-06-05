var helpers = {};

helpers.logQuery = function(query) {
	console.log(query);
	return query;
}

helpers.escapeSQLString = function(string) {
	var fixed_string = string.replace(/'/g, "''");
	return fixed_string;
};

module.exports = helpers;
