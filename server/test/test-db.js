/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var sandbox, testCase,
	tests;

testCase = require("nodeunit").testCase;
sandbox = require("nodeunit").utils.sandbox;

tests = testCase({
	  setUp: function(callback) {
		auth = sandbox("../auth.js", {
			  "require": function(filename) {
				var requireObj;

				if (filename === "mongodb") {
					requireObj = {
					}
				}
				else if (filename === "./log") {
					requireObj = {
						  "print": function() {}
					};
				}

				return(requireObj);
			}
			, "exports": {
			}
		});

		callback();
	}
	, tearDown: function(callback) {
	}
	, testStart: function(callback) {
	}
	, testOpenedDb: function(callback) {
	}
	, testAuthedDb: function(callback) {
	}
	, testUserNameLookup: function(callback) {
	}
	, testFindOne: function(callback) {
	}
});

testCase = require("nodeunit").testCase;
sandbox = require("nodeunit").utils.sandbox;
