var user = require("./user");
var websocket = require("websocket-server");

function Machine(socketServer, connection) {
	this.socketServer = socketServer;
	this.connection = connection;
	this.authenticated = false;

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
		this.authUser(msg);
	}
	else {
		this.connection.send(msg);
	}
}

Machine.prototype.authUser = function(credentials) {
	var valid;

	valid = false;

	// Will need to be reworked when dealing with DB and callback.
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
}

function start(world) {
	var socketServer;

	socketServer = websocket.createServer();

	socketServer.addListener("connection", function(connection) {
		var inputState;

		inputState = new Machine(socketServer, connection);

		connection.addListener("message", function(message) {
			inputState.parseInput(message);
		});
	});

	socketServer.listen(4000);
}

exports.start = start;
