var mechanics = require("../mechanics.js");

var testMinRoll = function(test) {
	test.equal(mechanics.minRoll(6, [[2, 6], [1, 7]]), 9);
	test.done();
};

var testMaxRoll = function(test) {
	test.equal(mechanics.maxRoll(6, [[2, 6], [1, 7]]), 25);
	test.done();
};

exports.testMinRoll = testMinRoll;
exports.testMaxRoll = testMaxRoll;
