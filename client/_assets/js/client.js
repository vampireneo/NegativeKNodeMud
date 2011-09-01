;(function($) {
	$(document).ready(function(){
		var serverSocket = new WebSocket("ws:localhost:4000");

		var jQueryConsole = $('<div class="console">');

		var controller = jQueryConsole.console({
			promptLabel: 'nodeMud> ',
			continuedPromptLabel: '  -> ',
			commandHandle: function(line, report) {
				if (line != '') {
					serverSocket.send(line);
				}
				return true;
			},
			autofocus: true,
			animateScroll: true,
			promptHistory: true
		});

		serverSocket.onopen = function(event) {
			controller.commandResult('Connection opened.');
		};

		serverSocket.onmessage = function(event) {
			controller.commandResult(event.data);
		};

		serverSocket.onclose = function(event) {
			controller.commandResult("Connection closed: " + event.data);
		};

		$('body').append(jQueryConsole);
	});
})(jQuery);

