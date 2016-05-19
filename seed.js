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

function seedDB(connection, db) {
	if (db == "Works") {
		connection.query("SHOW TABLES LIKE 'Works'", function(error, rows, fields) {
			console.log(rows);
			if (rows[0] != null) {
				connection.query("DROP TABLE Works");
			}
		
			// create Works table
			connection.query("CREATE TABLE Works (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(30), image VARCHAR(255), width FLOAT(16), height FLOAT(16), type VARCHAR(16), info VARCHAR(1024))", function(error) {
				// insert new data
				connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Path Through Woods', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/13077069_611152469032084_4995991597519597704_n.jpg?oh=7e9c2da1265d6207b13f4e59252471dd&oe=57ACE9E8', 6, 4, 'This is Dusk')");
				connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Four Happy Sheep', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/13051737_612315275582470_6500075902303540450_n.jpg?oh=e2530af2e20250e3a9d9053dd16df10c&oe=579A2A25', 6, 4, 'This is Dawn')");
				connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Rocks', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12920259_600333290114002_2371548168876836230_n.jpg?oh=c5ebbaf7dee9683165613d09113ca2ab&oe=57DF0289', 10, 8, 'This is Twlight')");
				connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Field', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/10409411_593646210782710_4863077774119024382_n.jpg?oh=35a4be7a26c22a6f9dbae533e5cbbaaf&oe=57D93E91', 6, 4, 'This is Noon')");
				connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Sheep Duo', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/11210507_481593075321358_5564086249374417458_n.jpg?oh=752f104020f3e04fdeaf058f23ac7933&oe=57AA8308', 4, 4, '2 Sheep in a field 4 ever.')");
				connection.query("INSERT INTO Works (title, image, width, height, info) VALUES ('Barn', 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/11903868_526601964153802_3788702959572103390_n.jpg?oh=e5172b95532b86c4398cc47f891426fd&oe=57DFC731', 8, 6, 'THIngs things things')");
			});
		});
	} else if (db == "Posts") {
		connection.query("SHOW TABLES LIKE 'Posts'", function(error, rows, fields) {
			console.log(rows[0]);
			if (rows[0] != null) {
				connection.query("DROP TABLE Posts");
			}
		
			// create Posts table
			connection.query("CREATE TABLE Posts (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(64), date VARCHAR(32), content VARCHAR(24576))", function(error) {
				// insert new data
				connection.query("INSERT INTO Posts (title, date, content) VALUES ('First Post', '2016-04-16', 'This is a dumby joke test post')");
				connection.query("INSERT INTO Posts (title, date, content) VALUES ('What is this title', '2015-05-12', 'This is a dumby joke test post')");
				connection.query("INSERT INTO Posts (title, date, content) VALUES ('Third Post', '2016-05-19', 'This is a dumby joke test post')");
			});
		});
	}
}

function seedPostDB(connection) {
	
}

module.exports = seedDB;
