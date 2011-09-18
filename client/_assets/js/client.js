;(function($) {
	$(document).ready(function(){
		var serverSocket = io.connect("http://localhost:4000");

		$('body').append('<div id="terminal">');

		$('#terminal').terminal(function(command, term) {
			serverSocket.send(command);
		}, {
			name: 'nodeMud',
			height: 600,
			prompt: 'nodeMUD>',
			onInit: function(term) {
				term.clear();

				serverSocket.on("open", function(event) {
					term.echo('Connection opened.');
				});

				serverSocket.on("message", function(event) {
					term.echo(event);
				});

				serverSocket.on("close", function(event) {
					term.echo("Connection closed: " + event);
				});
			}
		});
	});
})(jQuery);
