var websocket = require("websocket-server");

function start(log, Machine) {
	var socketServer;

	// This needs to be SSLized.
	socketServer = websocket.createServer();

	socketServer.addListener("connection", function(connection) {
		var inputState;

		inputState = new Machine(connection);

		log.print(3, "Accepted connection from <IP>.");

		connection.addListener("message", function(message) {
			inputState.parseInput(message);
		});
	});

	socketServer.listen(4000);
}

exports.start = start;
