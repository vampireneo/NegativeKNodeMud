;(function($) {
	$(document).ready(function(){
		var serverSocket= new WebSocket("ws:localhost:4000");

		$('body').append('<div id="terminal">');

		$('#terminal').terminal(function(command, term) {
			serverSocket.send(command);
		}, {
			name: 'nodeMud',
			height: 600,
			prompt: 'nodeMUD>',
			onInit: function(term) {
				term.clear();

				serverSocket.onopen = function(event) {
					term.echo('Connection opened.');
				};

				serverSocket.onmessage = function(event) {
					term.echo(event.data);
				};

				serverSocket.onclose = function(event) {
					term.echo("Connection closed: " + event.data);
				};
			}
		});
	});
})(jQuery);

