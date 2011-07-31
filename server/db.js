var mongo = require("mongodb");


function start(log) {
	var db, user, password

	// Herp derp conf file.
	user = 'user';
	password = 'password';
	db = new mongo.Db('mud', new mongo.Server("127.0.0.1", 27017, 
	  {auto_reconnect:true}), {});

	db.open(function(err, db) {
		if(err) {
			var logMsg;

			logMsg = 'ERR: Failed to open DB connection.\n' + err;
			log.print(0, logMsg);
			process.exit(1);
		}

		openedDb(log, db, user, password);
	});
}

function openedDb(log, db, user, password) {
	db.authenticate('user', 'password', function(err, result) {
		if(err) {
			log.print(0, 'ERR: ' + err);
			process.exit(1);
		}
	});
}

exports.start = start;
