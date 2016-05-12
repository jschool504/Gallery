var mysql	= require("mysql");
var fs		= require("fs");

function loadDB() {
	var rows = fs.readFileSync("data.csv").toString().split("\n");
	rows.splice(0, 1); // remove header
	rows.splice(rows.length - 1, 1);
	var data = [];
	rows.forEach(function(row, index) {
		data.push(row.split("|"));
	});
	return data;
}

function seedDB(connection) {
	connection.query("SHOW TABLES LIKE 'Works'", function(error, rows, fields) {
		console.log(rows);
		if (rows) {
			connection.query("DROP TABLE Works");
		}
		
		// create Works table
		connection.query("CREATE TABLE Works (title VARCHAR(30), image VARCHAR(255), width FLOAT(16), height FLOAT(16), info VARCHAR(1024))");
		// insert new data
		connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Path Through Woods', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/13077069_611152469032084_4995991597519597704_n.jpg?oh=7e9c2da1265d6207b13f4e59252471dd&oe=57ACE9E8', 9, 12, 'This is Dusk')");
		connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Four Happy Sheep', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/13051737_612315275582470_6500075902303540450_n.jpg?oh=e2530af2e20250e3a9d9053dd16df10c&oe=579A2A25', 8, 10, 'This is Dawn')");
		connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Rocks', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12920259_600333290114002_2371548168876836230_n.jpg?oh=c5ebbaf7dee9683165613d09113ca2ab&oe=57DF0289', 4, 6, 'This is Twlight')");
		connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Field', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/10409411_593646210782710_4863077774119024382_n.jpg?oh=35a4be7a26c22a6f9dbae533e5cbbaaf&oe=57D93E91', 8.5, 11, 'This is Noon')");
		connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Sheep Duo', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/11210507_481593075321358_5564086249374417458_n.jpg?oh=752f104020f3e04fdeaf058f23ac7933&oe=57AA8308', 5, 7, '2 Sheep in a field 4 ever.')");
		connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Barn', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/10384672_340503286097005_7577172611833547080_n.jpg?oh=8d0ee8eb38763aa79f9c303e2819170b&oe=57A57697', 100, 5, '2 Sheep in a field 4 ever.')");
	});
}

module.exports = seedDB;
