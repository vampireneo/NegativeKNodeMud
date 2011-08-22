/* Parameters:
 *	bonus: Additive bonus to die rolls.
 *	diceToRoll: Array of [number of dice, number of sides]
 *
 * Returns
 *	rollSum: Sum of bonus and die roll results.
 */
var roll = function(bonus, diceToRoll) {
	var rollSum, index, dieArray, i;

	rollSum = bonus;

	for (index in diceToRoll) {
		dieArray = diceToRoll[index];

		for (i = 0; i < dieArray[0]; i++) {
			rollSum += Math.floor(Math.random()*dieArray[1]) + 1;
		}
	}

	return(rollSum);
};

/* Parameters
 *	bonus: Additive bonus to die rolls.
 *	diceToRoll: Array of [number of dice, number of sides]
 *
 * Returns
 *	minSum: Minimum possible roll.
 */
var minRoll = function(bonus, diceToRoll) {
	var minSum, index;

	minSum = bonus;

	for (index in diceToRoll) {
		minSum += +diceToRoll[index][0];
	}

	return(minSum);
};

/* Parameters
 *	bonus: Additive bonus to die rolls.
 *	diceToRoll: Array of [number of dice, number of sides]
 *
 * Returns
 *	maxSum: Maximum possible roll.
 */
var maxRoll = function(bonus, diceToRoll) {
	var maxSum, index, dieArray;

	maxSum = bonus;

	for (index in diceToRoll) {
		dieArray = diceToRoll[index];
		maxSum += dieArray[0]*dieArray[1];
	}

	return(maxSum);
};

/* Parameters
 *	diceString: String formatted in standard RPG manner. Example: 100+3d4.
 *
 * Returns
 *	bonus: Additive bonus to die rolls.
 *	diceToRoll: Array of [number of dice, number of sides]
 *
 * TODO:
 *	Modify diceString.split('+') to support negative bonuses.
 */
var parseDiceString = function(diceString) {
	var diceParams, index, chunk, formatError, dieParts, bonus, diceToRoll; 

	diceToRoll = [];
	bonus = 0;
	formatError = false;
	diceParams = diceString.split('+');
	
	for (var index = 0; index < diceParams.length; index++) {
		chunk = diceParams[index];

		dieParts = chunk.split('d');

		if (dieParts !== undefined && dieParts.length === 1) {
			if (/^\d+$/.test(dieParts[0])) {
				bonus += +dieParts[0];
			}
			else {
				formatError = true;
			}
		}
		else if (dieParts.length === 2) {
			if (/^\d+$/.test(dieParts[0]) && /^\d+$/.test(dieParts[1])) {
				// Since this can result in things like [[1, 4], [1, 4]]
				// instead of [[2, 4]], it's inefficient -- but probably not
				// enough to matter. ...Right?
				diceToRoll[diceToRoll.length] = 
				  new Array(dieParts[0], dieParts[1]);
			}
			else {
				formatError = true;
			}
		}
		else {
			formatError = true;
		}
	}
	if (formatError) {
		throw(new Error("Unable to parse " + diceString));
	}

	return([bonus, diceToRoll]);
};

/* Parameters
 *	diceString: String formatted in standard RPG manner. Example: 100+3d4.
 */
var dieConstructor = function(paramDiceString) {
	var that, diceString, bonus, diceToRoll, min, max;

	that = {};

	that.setDiceString = function(paramDiceString) {
		var parseResults;

		parseResults = parseDiceString(paramDiceString);

		diceString = diceString;
		bonus = parseResults[0];
		diceToRoll = parseResults[1];

		min = minRoll(bonus, diceToRoll);
		max = maxRoll(bonus, diceToRoll);
	};

	that.roll = function() {
		return(roll(bonus, diceToRoll));
	};

	that.getMinRoll = function() {
		return(min);
	};

	that.getMaxRoll = function() {
		return(max);
	};

	that.setDiceString(paramDiceString);

	return that;
}

exports.dieConstructor = dieConstructor;
exports.roll = roll;
exports.minRoll = minRoll;
exports.maxRoll = maxRoll;
exports.parseDiceString = parseDiceString;
