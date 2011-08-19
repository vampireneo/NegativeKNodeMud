var mechanics = require("../mechanics.js");

var testRoll = function(test) {
	Math.random = function() {
		return(0.5);
	}

	test.equal(mechanics.roll(6, [[2, 6]]), 14);
	// Test for appropriate distributions.
	test.done();
}

var testMinRoll = function(test) {
	test.equal(mechanics.minRoll(6, [[2, 6], [1, 7]]), 9);
	test.done();
};

var testMaxRoll = function(test) {
	test.equal(mechanics.maxRoll(6, [[2, 6], [1, 7]]), 25);
	test.done();
};

exports.testRoll = testRoll;
exports.testMinRoll = testMinRoll;
exports.testMaxRoll = testMaxRoll;
