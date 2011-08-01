var websocket = require("websocket-server");

function Machine(usersColl, log, connection) {
	this.log = log;
	this.authenticated = false;
	this.connection = connection;

	this.welcome();
}

Machine.prototype.welcome = function() {
	this.connection.send("Welcome to nodeMud. Beware of falling rocks.");
	this.connection.send("Login: ");
}

Machine.prototype.parseInput = function(msg) {
	// This might not be the best way to go about it. Think about having a
	// nextFunction variable instead?
	if (!this.authenticated) {
		this.lookupUser(msg);
	}
	else {
		this.connection.send(msg);
	}
}

Machine.prototype.lookupUser = function(credentials) {
	var valid;

	valid = false;

	this.users.findOne(credentials.user, function(err, document) {
		if(err) {
			var logMsg;

			logMsg = "Warning: Error looking up user '" + credentials.user +
			  "' in database.\n" + err;
			log(1, logMsg);
		}
	});

	/*
	if(credentials == "tester:password") {
		valid = true;
	}

	if (valid) {
		// Add a new user object to the world.
		this.authenticated = true;
	}
	else {
		this.connection.reject("Invalid username or password.");
	}
	*/
}

function start(log, usersColl) {
	var socketServer;

	socketServer = websocket.createServer();

	socketServer.addListener("connection", function(connection) {
		var inputState;

		inputState = new Machine(db, log, connection);

		connection.addListener("message", function(message) {
			inputState.parseInput(message);
		});
	});

	socketServer.listen(4000);
}

exports.start = start;
