var auth = require("./auth");
var log = require("./log");

var db;

function Machine(connection) {
	this.authenticated = false;
	this.connection = connection;

	this.welcome();
}

Machine.prototype.welcome = function() {
	this.connection.send('{"type":"message", "message":"Welcome to nodeMud. Beware of falling rocks."}');
	this.connection.send('{"type":"login"}');
};

Machine.prototype.parseInput = function(msg) {
	// This might not be the best way to go about it. Think about having a
	// nextFunction variable instead?
	if (!this.authenticated) {
		// There's got to be a better way than to use 'this'.
		auth.authUser(msg, db, this);
	}
	else {
		this.connection.send(msg);
	}
};

/* Parameters
 *	returnCode:
 *		 1 => Successful auth.
 *		 0 => Invalid password.
 *		-1 => Invalid username.
 *	logMsg: Message to print to log.
 *	userMsg: Message to print to user.
 */
Machine.prototype.authResults = function(returnCode, logMsg, userMsg) {
	log.print(returnCode + 2, logMsg);

	if (1 == returnCode) {
		this.authenticated = true;
	}
	else if (0 <= returnCode) {
		this.connection.close(userMsg);
	}
};

function start(passedDb) {
	db = passedDb;
}

exports.Machine = Machine;
exports.start = start;
