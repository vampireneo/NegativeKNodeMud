var mechanics = require("../mechanics.js");

var testRoll = function(test) {
	var oldRandom, counter, rollResults, numRolls, lowerVariance, higherVariance;

	rollResults = [0, 0, 0, 0, 0, 0, 0]; 
	numRolls = 100000;

	for (counter = 0; counter < numRolls; counter++) {
		rollResults[mechanics.roll(0, [[1, 6]])]++
	}

	lowerVariance = (1 - 0.05)*numRolls/6;
	higherVariance = (1 + 0.05)*numRolls/6;

	for (counter = 1; counter <= 6; counter++) {
		test.ok(rollResults[counter] > lowerVariance);
		test.ok(rollResults[counter] < higherVariance);
	}
	
	oldRandom = Math.random;
	Math.random = function() {
		return(0.5);
	}

	test.deepEqual(mechanics.roll(6, [[2, 5]]), 12);
	test.deepEqual(mechanics.roll(0, [[2, 6]]), 8);
	test.deepEqual(mechanics.roll(10, []), 10);
	test.deepEqual(mechanics.roll(0, [[]]), 0);
	test.deepEqual(mechanics.roll(-1, [[]]), -1);
	test.deepEqual(mechanics.roll(1, [[-1, 4]]), 1);
	test.deepEqual(mechanics.roll(1, [[1, -6]]), -1);
	test.deepEqual(mechanics.roll(0, [[1, 2], [1, 4], [1, 6], [1, 8]]), 14);
	// Test for appropriate distributions.
	test.done();

	Math.random = oldRandom;
}

var testMinRoll = function(test) {
	test.deepEqual(mechanics.minRoll(6, [[2, 6], [1, 7]]), 9);
	test.done();
};

var testMaxRoll = function(test) {
	test.deepEqual(mechanics.maxRoll(6, [[2, 6], [1, 7]]), 25);
	test.done();
};

var testParseDiceString = function(test) {
	//test.deepEqual(mechanics.parseDiceString(""), [0, []]);
	test.deepEqual(mechanics.parseDiceString("0"), [0, []]);
	test.deepEqual(mechanics.parseDiceString("15+1d6"), [15, [[1, 6]]]);
	test.deepEqual(mechanics.parseDiceString("1d6+15"), [15, [[1, 6]]]);
	test.deepEqual(mechanics.parseDiceString("1d6+15+2d6+15+3d6+15+4d6+15"),
			[60, [[1, 6], [2, 6], [3, 6], [4, 6]]]);
	//test.throws(mechanics.parseDiceString("0+", "Unable to parse 0+",
			//"Failed to throw error on invalid diceString."));
	test.throws(function () {
		mechanics.parseDiceString("0+")
	});
	test.throws(function () {
		mechanics.parseDiceString("+")
	});
	test.throws(function () {
		mechanics.parseDiceString("0+2d3d4")
	});
	test.done();
}

exports.testRoll = testRoll;
exports.testMinRoll = testMinRoll;
exports.testMaxRoll = testMaxRoll;
exports.testParseDiceString = testParseDiceString;
