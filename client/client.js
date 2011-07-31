var serverSocket, message, output;

output = document.getElementById("output");

serverSocket = new WebSocket("ws:192.168.1.2:4000");

serverSocket.onopen = function(event) {
	writeOutput("Connected.");
	serverSocket.send("A user connected.");
};

serverSocket.onmessage = function(event) {
	writeOutput("Message: " + event.data);
};

serverSocket.onclose = function(event) {
	writeOutput("Connection closed.");
};

function writeOutput(message) {
	var element = document.createElement("p");
	element.innerHTML = message;
	output.appendChild(element);
}

function inputSubmit() {
	input = document.getElementById("command");

	serverSocket.send(input.value);
}

writeOutput('Test a really really really really long line a really long line a really long line a really long line a really long line a really long line a really long line.');
