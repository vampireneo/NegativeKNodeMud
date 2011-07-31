var mongo = require("mongodb");


function start(log) {
	var db, user, password

	user = 'user';
	password = 'password';
	db = new mongo.Db('mud', new mongo.Server("127.0.0.1", 27017, 
	  {auto_reconnect:true}), {});

	db.open(function(err, db) {
		if(err) {
			var logMsg;

			logMsg = 'Fatal error: Failed to open DB connection.' +
			  '\n' + err;
			log.print(0, logMsg);
			process.exit(1);
		}
		db.authenticate('user', 'password', function(err, result) {
			if(err) {
				console.error('Fatal error: Failed to ' +
				  'authenticate to database.');
				console.error(err);
				process.exit(1);
			}
		});
	});
}

exports.start = start;
