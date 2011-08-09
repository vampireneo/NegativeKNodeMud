// Debug == 3, message == 2, warn == 1, fatal == 0.
var LOG_LEVEL = 3;

function print(errorLevel, msg) {
	// I hear that saving to a file might be a good idea -- especially for
	// non-error messages.
	if (errorLevel <= LOG_LEVEL) {
		switch (errorLevel) {
			case 3:
				msg = "DBG: " + msg;
				break;
			case 1:
				msg = "WRN: " + msg;
				break;
			case 0:
				msg = "ERR: " + msg;
				break;
		}

		console.error(msg);
	}

	if (errorLevel == 0) {
		process.exit(1);
	}
}


exports.print = print;
