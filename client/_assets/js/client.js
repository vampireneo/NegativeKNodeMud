(function($) {
	$(document).ready(function(){
		var jqueryConsole = $('<div class="console">');
		$('body').append(jqueryConsole);

		var controller = jqueryConsole.console({
			promptLabel: 'nodeMud> ',
			continuedPromptLabel: '  -> ',
			/*
			commandValidate: function(line) {
				if (line == '') {
					return false;
				} else {
					return true;
				}
			},
			*/
			commandHandle: function(line, report) {
				if (line != '') {
					controller.continuedPrompt = false;
					return [{msg: "Execute: " + line}];
				}
				return true;
			},
			autofocus: true,
			animateScroll: true,
			promptHistory: true
		});
		
		var serverSocket = new WebSocket("ws:localhost:4000");

		serverSocket.onopen = function(event) {
			controller.promptText('Connection opened.');
		};

		serverSocket.onmessage = function(event) {
			controller.promptText(event.data);
		};

		serverSocket.onclose = function(event) {
			controller.promptText("Connection closed: " + event.data);
		};
	});
})(jQuery);

