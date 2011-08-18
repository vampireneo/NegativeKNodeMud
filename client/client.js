(function($) {
	var serverSocket = new WebSocket("ws:localhost:4000");

	serverSocket.onopen = function(event) {
		writeOutput("Connection opened.");
	};

	serverSocket.onmessage = function(event) {
		writeOutput("Message: " + event.data);
	};

	serverSocket.onclose = function(event) {
		writeOutput("Connection closed: " + event.data);
	};

	function writeOutput(message) {
		var element = $("<p>" + message + "</p>");
		$("#output").append(element);
	}

	//prevent the form from submitting
	$("#input form").bind("submit", function(e){
		e.preventDefault();
	});

	//bind keypress to input submission
	$("#input input").bind("keypress", function(e){
		if (e.keyCode == 13) {
			serverSocket.send($(this).val());
			$(this).select();
		}
	});

})(jQuery);

