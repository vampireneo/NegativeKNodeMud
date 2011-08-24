(function($) {
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
				return "command printed";
			},
			autofocus: true,
			animateScroll: true,
			promptHistory: true
		});

		serverSocket.onopen = function(event) {
			controller.notice('Connection opened.');
			controller.scrollToBottom();
		};

		serverSocket.onmessage = function(event) {
			controller.notice(event.data);
			controller.scrollToBottom();
		};

		serverSocket.onclose = function(event) {
			controller.notice("Connection closed: " + event.data);
			controller.scrollToBottom();
		};

		$('body').append(jQueryConsole);
		console.log(controller);
	});
})(jQuery);

