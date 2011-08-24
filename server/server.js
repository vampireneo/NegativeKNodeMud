var websocket = require("websocket-server");

function start(log, Machine) {
	var socketServer;

	// This needs to get SSLizard.
	socketServer = websocket.createServer();

	socketServer.addListener("connection", function(connection) {
		var inputState;

		inputState = new Machine(connection);

		log.print(3, "Accepted connection, id: " + connection.id);

		connection.addListener("message", function(message) {
			inputState.parseInput(message);
		});
	});

	socketServer.listen(4000);
}

exports.start = start;

