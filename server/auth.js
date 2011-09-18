var crypto, log,
	authUser, lookupUser, validateUser;

crypto = require("crypto");
log = require("./log");

authUser = function(credString, db, parserMachine) {
	var credentials, err, logMsg, userMsg;

	try {
		credentials = JSON.parse(credString);
	}
	catch (err) {
		credentials = -1;
	}

	if (-1 == credentials) {
		// Need to figure out how to obtain the IP.
		logMsg = "Failed to parse login string from <IP>.\n\t" + err;
		userMsg = "Unable to parse credential string.";
		parserMachine.authResults(-1, logMsg, userMsg);
	}
	else {
		log.print(3, "Authenticating user.\n\t" + credentials.user);

		lookupUser(credentials, db, parserMachine);
	}
};

lookupUser = function(credentials, db, parserMachine) {
	var logMsg, userMsg;

	db.userNameLookup(credentials.user, function(err, document) {
		if (undefined === err) {
			validateUser(credentials, document, parserMachine);
		}
		else {
			if (-1 == err) {
				logMsg = "Invalid username: " + credentials.user;
				userMsg = "Invalid username or password.";
			}
			else {
				logMsg = "Failed to look up user '" + credentials.user +
						"' in database.\n\t" + err;
				userMsg = "Error when attempting to lookup username.";
			}

			parserMachine.authResults(-1, logMsg, userMsg);
		}
	});
};

validateUser = function(credentials, document, parserMachine) {
	var authCode, logMsg, userMsg, hash, hashedPass;

	if (undefined === document) {
		authCode = 0;
		logMsg = "Invalid username: " + credentials.user + ".";
		userMsg = "Invalid username or password.";
	}
	else {
		// I'm typing SHA into my code. I'm pretty sure I'm an idiot.
		hash = crypto.createHash("sha512");
		hash.update(credentials.password);
		hashedPass = hash.digest('hex');

		if (hashedPass == document.password) {
			authCode = 1;
			logMsg = "User successfully authenticated.\n\t" + credentials.user;
		}
		else {
			authCode = 0;
			logMsg = "Invalid password. Username: " + credentials.user + ".";
			userMsg = "Invalid username or password.";
		}
	}

	parserMachine.authResults(authCode, logMsg, userMsg);
};

exports.authUser = authUser;
exports.__lookupUser = lookupUser;
exports.__validateUser = validateUser;
