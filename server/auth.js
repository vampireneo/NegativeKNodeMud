var crypto = require("crypto");
var log = require("./log");

function authUser(credString, db, parserMachine) {
	var credentials, err;

	try {
		credentials = JSON.parse(credString);
	}
	catch (err) {
		credentials = -1;
	}

	if (-1 == credentials) {
		var logMsg, userMsg;

		// Need to figure out how to obtain the IP.
		logMsg = "Failed to parse login string from <IP>.\n\t" + err;
		userMsg = "Unable to parse credential string.";
		parserMachine.authResults(-1, logMsg, userMsg);
	}
	else {
		log.print(3, "Authenticating user.\n\t" + credentials.user);

		lookupUser(credentials, db, parserMachine);
	}
}

function lookupUser(credentials, db, parserMachine) {
	db.userNameLookup(credentials.user, function(err, document) {
		if (undefined === err) {
			validateUser(credentials, document, parserMachine);
		}
		else if (-1 == err) {
			var logMsg, userMsg;

			logMsg = "Invalid username: " + credentials.user;
			userMsg = "Invalid username or password.";
			parserMachine.authResults(-1, logMsg, userMsg);
		}
		else {
			var logMsg, userMsg;

			logMsg = "Failed to look up user '" + credentials.user +
			  "' in database.\n\t" + err;
			userMsg = "Error when attempting to lookup username.";
			parserMachine.authResults(-1, logMsg, userMsg);
		}
	});
}

function validateUser(credentials, document, parserMachine) {
	var authCode, logMsg, userMsg;

	if (undefined === document) {
		authCode = 0;
		logMsg = "Invalid username: " + credentials.user + ".";
		userMsg = "Invalid username or password.";
	}
	else {
		var hash, hashedPass;

		// I'm typing SHA into my code. I'm pretty sure I'm an idiot.
		hash = crypto.createHash("sha512");
		hash.update(credentials.password);
		hashedPass = hash.digest('hex');

		if (hashedPass == document.password) {
			authCode = 1;
			logMsg = credentials.user + " successfully authenticated.";
		}
		else {
			authCode = 0;
			logMsg = "Invalid password. Username: " + credentials.user + ".";
			userMsg = "Invalid username or password.";
		}
	}

	parserMachine.authResults(authCode, logMsg, userMsg);
}

exports.authUser = authUser;
