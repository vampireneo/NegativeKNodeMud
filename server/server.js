var websocket = require("websocket-server");
var timerQueue = require("./queue.js");

function start() {
	var socketServer;

	socketServer = websocket.createServer();

	socketServer.addListener("connection", function(connection) {
		connection.addListener("message", function(message) {
			broadcast(message, connection);
		});
	});

	socketServer.listen(4000);
}

function broadcast(message, connection) {
	connection.write(message);
	connection.broadcast(message);
}

exports.start = start;
