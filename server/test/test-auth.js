/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var sandbox, auth,
	testAuthUser, testLookupUser, testValidateUser;

sandbox = require("nodeunit").utils.sandbox;
auth = sandbox("../auth.js", {require: function() {}, exports: {}});

testAuthUser = function(test) {
	var log, credString, db, parserMachine, userNameLookup;

	// =T
	auth["log"] = {
		  "print": function() {
			console.log("WheeL!");
		}
	};
	auth["parserMachine"] = {
		  "authResults": function(code, logMsg, userMsg) {
			console.log("code: " + code);
			console.log("logMsg: " + logMsg);
			console.log("userMsg: " + userMsg);
		}
	};
auth["lookupUser"];
	auth["lookupUser"] = function() {
		console.log("WheeU!");
	};
console.log(auth["lookupUser"]);

	credString = "{}";
	auth.authUser(credString, db, parserMachine);

	test.done();
};

testLookupUser = function(test) {
	test.done();
};

testValidateUser = function(test) {
	test.done();
};

exports.testAuthUser = testAuthUser;
