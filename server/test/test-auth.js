/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var sandbox, auth, testCase,
	tests;

testCase = require("nodeunit").testCase;
sandbox = require("nodeunit").utils.sandbox;

tests = testCase({
	  setUp: function(callback) {
		auth = sandbox("../auth.js", {
			  "require": function(filename) {
				var requireObj;

				if (filename === "./log") {
					requireObj = {
						  "print": function() {}
					}
				}
				else if (filename === "crypto") {
					requireObj = {
						  "createHash": function() {
							var hash = {
								  "update": function() {}
								, "digest": function() {
									return("aHash");
								}
							};

							return(hash);
						}
					};
				}

				return(requireObj);
			}
			, "exports": {
			}
			, "console": console
		});

		callback();
	}
	, tearDown: function(callback) {
		callback();
	}
	, testAuthUser: function(test) {
		var credString, db, parserMachine, userCreds, authCode, logMsg, userMsg;

		db = {
			  "userNameLookup": function(retUserCreds) {
				userCreds = retUserCreds;
			}
		};

		parserMachine = {
			  "authResults": function(retAuthCode, retLogMsg, retUserMsg) {
				authCode = retAuthCode;
				logMsg = retLogMsg;
				userMsg = retUserMsg;
			}
		};

		credString = '{"user":"aUser", "password":"aPassword"}';
		auth.authUser(credString, db, parserMachine);
		test.strictEqual(authCode, undefined);
		test.strictEqual(logMsg, undefined);
		test.strictEqual(userMsg, undefined);
		test.strictEqual(userCreds, "aUser");

		authCode = logMsg = userMsg = userCreds = undefined;
		credString = '{"password":"aPassword", "user":"aUser"}';
		auth.authUser(credString, db, parserMachine);
		test.strictEqual(authCode, undefined);
		test.strictEqual(logMsg, undefined);
		test.strictEqual(userMsg, undefined);
		test.strictEqual(userCreds, "aUser");

		authCode = logMsg = userMsg = userCreds = undefined;
		credString = '{"user":"aUser, "password":"aPassword"}';
		auth.authUser(credString, db, parserMachine);
		test.strictEqual(authCode, -1);
		test.strictEqual(userCreds, undefined);

		test.done();
	}
	, testLookupUser: function(test) {
		var db, parserMachine, credentials, userCreds, authCode, logMsg,
			userMsg, errVal, docVal;

		db = {
			  "userNameLookup": function(retUserCreds, callback) {
				userCreds = retUserCreds;
				callback(errVal, docVal);
			}
		};

		parserMachine = {
			  "authResults": function(retAuthCode, retLogMsg, retUserMsg) {
				authCode = retAuthCode;
				logMsg = retLogMsg;
				userMsg = retUserMsg;
			}
		};

		authCode = logMsg = userMsg = userCreds = undefined;
		errVal = undefined;
		docVal = {"password": "aHash"};
		credentials = {"user": "aUser", "password": "aPassword"};
		auth.lookupUser(credentials, db, parserMachine);
		test.strictEqual(authCode, 1);
		test.strictEqual(userCreds, "aUser");

		authCode = logMsg = userMsg = userCreds = undefined;
		errVal = -1;
		docVal = {"password": "aHash"};
		credentials = {"user": "aUser", "password": "aPassword"};
		auth.lookupUser(credentials, db, parserMachine);
		test.strictEqual(authCode, -1);

		authCode = logMsg = userMsg = userCreds = undefined;
		errVal = "fail";
		docVal = {"password": "aHash"};
		credentials = {"user": "aUser", "password": "aPassword"};
		auth.lookupUser(credentials, db, parserMachine);
		test.strictEqual(authCode, -1);

		test.done();
	}
	, testValidateUser: function(test) {
		var creds, docVal, parserMachine, authCode, logMsg, userMsg;

		parserMachine = {
			  "authResults": function(retAuthCode, retLogMsg, retUserMsg) {
				authCode = retAuthCode;
				logMsg = retLogMsg;
				userMsg = retUserMsg;
			}
		};

		authCode = logMsg = userMsg = creds = undefined;
		creds = {"user": "aUser", "password": "aPassword"};
		docVal = undefined;
		auth.validateUser(creds, docVal, parserMachine);
		test.strictEqual(authCode, 0);

		authCode = logMsg = userMsg = creds = undefined;
		creds = {"user": "aUser", "password": "aPassword"};
		docVal = {"password": "notAHash"}; 
		auth.validateUser(creds, docVal, parserMachine);
		test.strictEqual(authCode, 0);

		authCode = logMsg = userMsg = creds = undefined;
		creds = {"user": "aUser", "password": "aPassword"};
		docVal = {"password": "aHash"}; 
		auth.validateUser(creds, docVal, parserMachine);
		test.strictEqual(authCode, 1);

		test.done();
	}
});

exports.tests = tests;
