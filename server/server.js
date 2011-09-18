var io = require("socket.io").listen(4000);

function start(log, Machine) {
	var socketServer;

	// This needs to get SSLizard.
	io.sockets.on("connection", function (connection) {
		var inputState;

		inputState = new Machine(connection);

		log.print(3, "Accepted connection. id: " + connection.id);

		connection.on("message", function (message) {
			inputState.parseInput(message);
		});
	});
}

exports.start = start;
