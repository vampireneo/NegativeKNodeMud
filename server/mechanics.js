// Talk about completely untested..

/* Parameters
 *	bonus: Constant added to the dice rolled.
 *	diceToRoll: Array of number of dice, number of side array pairs.
 *
 * Example: new Dice(50, [[2, 4], [5, 10]]); creats a dice object that will roll
 *	"50 + 2d4 + 5d10".
 */
function Dice(diceString) {
	var diceParams;

	this.diceString = diceString;
	this.bonus = 0;
	this.diceToRoll = new Array();

	diceParams = this.diceString.split('+');
	
	for each (var chunk in diceParams) {
		var dieParts, formatError;

		formatError = false;
		dieParts = chunk.split('d');

		if (dieParts.length == 1) {
			if (/^\d+$/.test(dieParts[0])) {
				this.bonus += dieParts[0];
			}
			else {
				formatError = true;
			}
		}
		else if (dieParts.length == 2) {
			if (/^\d+$/.test(dieParts[0]) && /^\d+$/.test(dieParts[1])) {
				this.diceToRoll.push([dieParts[0], dieParts[1]]);
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

	this.min = this.minRoll();
	this.max = this.maxRoll();
}

Dice.prototype.roll = function() {
	var rollSum;

	rollSum = this.bonus;

	for (var dieArray in this.diceToRoll) {
		for (var i = 0; i < dieArray[0]; i++) {
			rollSum += Math.floor(Math.random()*dieArray[1]) + 1;
		}
	}

	return(rollSum);
};

Dice.prototype.minRoll = function() {
	var minSum;

	minSum = this.bonus;

	for (var dieArray in this.diceToRoll) {
		minSum += dieArray[0];
	}

	return(minSum);
};

Dice.prototype.maxRoll = function() {
	var maxSum;

	maxSum = this.bonus;

	for (var dieArray in this.diceToRoll) {
		maxSum += dieArray[0]*dieArray[1];
	}

	return(maxSum);
};

exports.Dice = Dice;
