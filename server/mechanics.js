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

var minRoll = function(bonus, diceToRoll) {
	var minSum, index;

	minSum = bonus;

	for (index in diceToRoll) {
		minSum += +diceToRoll[index][0];
	}

	return(minSum);
};

var maxRoll = function(bonus, diceToRoll) {
	var maxSum, index, dieArray;

	maxSum = bonus;

	for (index in diceToRoll) {
		dieArray = diceToRoll[index];
		maxSum += dieArray[0]*dieArray[1];
	}

	return(maxSum);
};

var parseDiceString = function(diceString) {
	var diceParams, index, chunk, formatError, dieParts, bonus, diceToRoll; 

	diceToRoll = new Array();
	bonus = 0;
	diceParams = diceString.split('+');
	
	for (index in diceParams) {
		chunk = diceParams[index];

		formatError = false;
		dieParts = chunk.split('d');

		if (dieParts.length == 1) {
			if (/^\d+$/.test(dieParts[0])) {
				bonus += +dieParts[0];
			}
			else {
				formatError = true;
			}
		}
		else if (dieParts.length == 2) {
			if (/^\d+$/.test(dieParts[0]) && /^\d+$/.test(dieParts[1])) {
				diceToRoll[diceToRoll.length] = 
				  new Array(+dieParts[0], +dieParts[1]);
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
		throw("Unable to parse " + diceString);
	}

	return([bonus, diceToRoll]);
};

/* Parameters
 *	diceString: Bonuses and dice to roll, in standard gamer format.
 * Example: "5+2d6+6+1d2"
 * TODO: Support negative bonuses.
 */
function Dice(diceString) {
	var parseResults;

	parseResults = parseDiceString(diceString);

	this.diceString = diceString;
	this.bonus = parseResults[0];
	this.diceToRoll = parseResults[1];

	this.roll = function() {
		return(roll(this.bonus, this.diceToRoll));
	};

	this.minRoll = function() {
		return(minRoll(this.bonus, this.diceToRoll));
	};

	this.maxRoll = function() {
		return(maxRoll(this.bonus, this.diceToRoll));
	};


	this.min = this.minRoll();
	this.max = this.maxRoll();
}

exports.Dice = Dice;
exports.roll = roll;
exports.minRoll = minRoll;
exports.maxRoll = maxRoll;
