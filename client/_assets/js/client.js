;(function($) {
	$(document).ready(function(){
		var serverSocket = new WebSocket("ws:localhost:4000");

		var jQueryTerminal = $('<div id="terminal">');

		$('body').append(jQueryTerminal);

		$('#terminal').terminal(function(command, term) {
			serverSocket.send(command);

			serverSocket.onopen = function(event) {
				term.echo('Connection opened.');
			};

			serverSocket.onmessage = function(event) {
				term.echo(event.data);
			};

			serverSocket.onclose = function(event) {
				term.echo("Connection closed: " + event.data);
			};
		}, {
			name: 'nodeMud',
			height: 600,
			prompt: 'nodeMUD>'
		});
	});
})(jQuery);

