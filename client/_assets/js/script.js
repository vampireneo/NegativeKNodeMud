;(function($) {
	$(document).ready(function() {
		var serverSocket = new WebSocket("ws:localhost:4000");

		$('body').append('<div id="terminal">');

		$('#terminal').terminal(function(command, term) {
			serverSocket.send(command);
		}, {
			name: 'nodeMUD',
			greetings: '== nodeMUD ==',
			height: 600,
			prompt: 'nodeMUD>',
			onInit: function(term) {
				serverSocket.onopen = function(event) {
					term.echo('Connection opened.');
				};

				serverSocket.onmessage = function(event) {
					var data = JSON.parse(event.data);
					term.set_prompt('nodeMUD>');
					switch (data.type) {
						case "message":
							term.echo(data.message);
							break;
						case "login":
							term.set_prompt(' username: ');
							break;
						case "password":
							term.set_prompt(' password: ');
							break;
					}
				};

				serverSocket.onclose = function(event) {
					term.echo("Connection closed: " + event.data);
				};
			}
		});
	});
})(jQuery);

