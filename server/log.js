// Debug == 2, warn == 1, fatal == 0.
var LOG_LEVEL = 2;

function print(errorLevel, msg) {
	if(errorLevel <= LOG_LEVEL) {
		console.error(msg);
	}
}

// I hear that saving to a file might be a good idea, too!

exports.print = print;
