/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var typeCompare, getterSetter, setCheck, rangeSetter, elOfSetter, subsetSetter,
	areaConstructor, roomConstructor, exitConstructor,
	// Unwritten
	mobConstructor, objConstructor, resetConstructor,
	shopConstructor, specialConstructor;

/* Parameters
 *	variable0, variable1: The two variables to compare types of.
 *
 * Returns
 *	validType: True if variables are of the same type. False otherwise.
 */
typeCompare = function(variable0, variable1) {
	var validType;

	if (! (Array.isArray(variable0) || Array.isArray(variable1)) &&
			typeof(variable0) === typeof(variable1)) {
		validType = true;
	}
	else if (Array.isArray(variable0) && Array.isArray(variable1)) {
		validType = true;
	}
	else {
		validType = false;
	}

	return(validType);
};

/* Parameters
 *	newVal: New value to set to.
 *	oldVal: Old value of member.
 *
 * Returns
 *	validVar: Whether newVal is defined and is of the same type.
 */
setCheck = function(newVal, oldVal) {
	var validVar;

	validVar = (undefined !== newVal && typeCompare(newVal, oldVal));

	return(validVar);
};

/* Creates a setter function for which a value must fit in a range.
 * Parameters
 *	memberContainer: Object which contains key.
 *	key: Key of value which is to be set.
 *	minVal: Minimum allowed value.
 *	maxVal: Maximum allowed value.
 *
 * Returns
 *	setterFunction: Setter function for key in memberContainer.
 */
rangeSetter = function(memberContainer, key, minVal, maxVal) {
	var currVal, setterFunction;

	currVal = memberContainer[key];

	setterFunction = function(newVal) {
		if (setCheck(newVal, currVal) && minVal <= newVal && newVal <= maxVal) {
			memberContainer[key] = newVal;
		}
		else {
			throw(new Error("Invalid value for " + key + ": " + newVal));
		}
	};

	return(setterFunction);
};

/* Creates a setter function for which a value must be contained in a given
 *		list.
 * NOTE: Does not handle Arrays of Objects.
 * Parameters
 *	memberContainer: Object which contains key.
 *	key: Key of value which is to be set.
 *	validVals: Array of valid values to take.
 *
 * TODO
 *	Consider moving away from indexOf to allow for Arrays and Objects.
 */
elOfSetter = function(memberContainer, key, validVals) {
	var setterFunction, index;

	for (index = 0; index < validVals.length; index++) {
		if (undefined === validVals[index]) {
			throw(new Error("elOfSetter can not handle undefined."));
		}
		else if (Array.isArray(validVals[index])) {
			throw(new Error("elOfSetter can not handle Arrays."));
		}
		else if("object" === typeof(validVals[index])) {
			throw(new Error("elOfSetter can not handle Objects."));
		}
	}

	setterFunction = function(newVal) {
		// No use for setCheck since we might have lots of types.
		if (undefined !== newVal && -1 !== validVals.indexOf(newVal)) {
			memberContainer[key] = newVal;
		}
		else {
			throw(new Error("Invalid value for " + key + ": " + newVal));
		}
	};

	return(setterFunction);
};

/* Creates a setter function for which the passed array must be a subset of a
 *		given list.
 * NOTE: Does not handle Arrays of Objects in the given list.
 * Parameters
 *	memberContainer: Object which contains key.
 *	key: Key of value which is to be set.
 *	validVals: Array of valid values to take.
 *
 * TODO
 *	Consider moving away from indexOf to allow for Arrays and Objects.
 */
subsetSetter = function(memberContainer, key, validVals) {
	var setterFunction, index;

	for (index = 0; index < validVals.length; index++) {
		if (undefined === validVals[index]) {
			throw(new Error("subsetSetter can not handle undefined."));
		}
		else if (Array.isArray(validVals[index])) {
			throw(new Error("subsetSetter can not handle Arrays."));
		}
		else if("object" === typeof(validVals[index])) {
			throw(new Error("subsetSetter can not handle Objects."));
		}
	}

	setterFunction = function(newVals) {
		var elToCheck, validSubset;

		validSubset = true;
		
		// No use for setCheck since we might have lots of types.
		for (index = 0; index < newVals.length; index++) {
			elToCheck = newVals[index];

			if (validSubset) {
				if (undefined === elToCheck || 
						-1 === validVals.indexOf(elToCheck)) {
					validSubset = false;
				}
			}
		}

		if (validSubset) {
			memberContainer[key] = newVals;
		}
		else {
			throw(new Error("New value '" + newVals + "' is not a subset " +
					"of " + validVals));
		}
	};

	return(setterFunction);
};

/* Parameters
 *	that: Object to operate on.
 *	memberContainer: Object which contains all valid members of that.
 *	key: Key to appropriate member in memberContainer.
 *	getter: Optional get function for member. If undefined, will simply return
 *		the value of the member.
 *	setter: Optional set function for member. If undefined, will simply set the
 *		value of the member to the passed newVal, assuming it's defined and
 *		matches type.
 *
 * Returns
 *	None.
 */
getterSetter = function(that, memberContainer, key, getter, setter) {
	var currVal;

	currVal = memberContainer[key];

	if (undefined === getter) {
		getter = function() {
			return(memberContainer[key]);
		};
	}

	if (undefined === setter) {
		setter = function(newVal) {
			if (setCheck(newVal, currVal)) {
				memberContainer[key] = newVal;
			}
			else {
				throw(new Error("Invalid value for " + key + ": " + newVal));
			}
		};
	}

	Object.defineProperty(that, key, {
		get: getter,
		set: setter
	});
};

/* Parameters (Object)
 *	builder: String; Name of the area's builder.
 *	areaName: String; Area name, as will be visible by the area command.
 *	filename: String; Filename for the area to be saved in.
 *	vNumRange: Array of Integers: Range of area's vnums. Example: [6, 20].
 *	levelRange: Array of Integers; Suggested minimum and maximum levels for
 *		the area. Example: [3, 15].
 *
 * TODO
 *	Perform better checks on vNumRange and levelRange.
 */
areaConstructor = function(paramObject) {
	var that, privateMembers, index;

	that = {};

	privateMembers = {
			  "builder": "builder"
			, "areaName": "area name"
			, "filename": "filename"
			, "vNumRange": [0, 0]
			, "levelRange": [0, 0]
	};

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			getterSetter(that, privateMembers, index);

			that[index] = paramObject[index];
		}
	}

	return(that);
};

/* Parameters (Object)
 *	vNum: Integer; Unique vnum for the room.
 *	header: String; Short label of the room. Players with 'brief' mode on will
 *		see only this.
 *	description: String; Room description, 3-10ish lines (for style.)
 *	flags: Array of Chars; Room flags. Each is a single char from
 *		['A', 'C', 'D', 'J', 'K', 'L', 'M', 'N']
 *	sectorType: Integer; Type of sector (for environmental effects.)
 *	exits: Array of exit objects.
 *	extras: Array of roomExtra objects.
 *	manaAdjust: Integer 1-200; Percentage adjuster to mana recovery rate. 100
 *		is normal.
 *	healAdjust: Integer 1-200; Percentage adjuster to heal recovery rate. 100
 *		is normal.
 *	clans: Array of Strings; Clans which are allowed access.
 *
 * TODO:
 *	Add array of rooms to areaConstructor once roomConstructor is complete.
 *	Add setter constraints on:
 *		* flags - subsetSetter
 *		* sectorType - subsetSetter
 */
roomConstructor = function(paramObject) {
	var that, privateMembers, index, otherGetters, otherSetters, defaultGetSet,
	validFlags, validSectors;

	that = {};

	privateMembers = {
			  "vNum": 0
			, "header": "A room"
			, "description": "A room"
			, "flags": [null]
			, "sectorType": 0
			, "exits": [null]
			, "extras": [null]
			, "manaAdjust": 100
			, "healAdjust": 100
			, "clans": [null]
	};

	otherGetters = [];
	otherSetters = ["manaAdjust", "healAdjust", "flags", "sectorType"];

	validFlags = [
			  "dark"
			, "no mob"
			, "indoors"
			, "private"
			, "safe"
			, "solitary"
			, "pet shop"
			, "no recall"
	];
	validSectors = [
			  "inside"
			, "city"
			, "field"
			, "forest"
			, "hills"
			, "mountain"
			, "water"
			, "deep water"
			, "air"
			, "desert"
	];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	getterSetter(that, privateMembers, "manaAdjust", undefined,
			rangeSetter(privateMembers, "manaAdjust", 0, 200));

	that.manaAdjust = paramObject.manaAdjust;

	getterSetter(that, privateMembers, "healAdjust", undefined,
			rangeSetter(privateMembers, "healAdjust", 0, 200));

	that.healAdjust = paramObject.healAdjust;

	getterSetter(that, privateMembers, "flags", undefined,
			subsetSetter(privateMembers, "flags", validFlags));

	that.flags = paramObject.flags;

	getterSetter(that, privateMembers, "sectorType", undefined,
			elOfSetter(privateMembers, "sectorType", validSectors));

	that.sectorType = paramObject.sectorType;

	return(that);
};

/* Parameters (Object)
 *	roomVnum: Integer; vnum of room the exit belongs to.
 *	direction: String; Direction which exit is: north, south, east, west, up,
 *			down.
 *	description: String; What will be seen if the character looks in the
 *			exit's direction.
 *	keywords: Array of Strings; Other valid keywords for the exit.
 *	doorState: String; "nodoor", "open", "closed", or "locked"
 *	connectVnum: Integer; vnum of room the exit connects to.
 *	keyVnum: Integer; vnum of key used to lock/unlock door.
 *
 * TODO:
 *	Add setter constraints on:
 *		* direction - elOfSetter
 *		* doorState - elOfSetter
 */
exitConstructor = function(paramObject) {
	var that, privateMembers, otherGetters, otherSetters, index, defaultGetSet;

	that = {};

	privateMembers = {
			  "roomVnum": 0
			, "direction": "north"
			, "description": "An exit."
			, "keywords": ["path", "trail"]
			, "doorState": "nodoor"
			, "connectVnum": 1
			, "keyVnum": 0
	};

	otherGetters = [];
	otherSetters = [];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	return(that);
};

/* Parameters (Object)
 *	vNum: Integer; Area virtual number of mob.
 *	nameList: Array of strings; List of valid names that reference mob.
 *	shortDesc: String; Fight/action description of mob.
 *	longDesc: String; Description provided when player sees mob in a room.
 *	lookDesc: String; Description of mob when inspected (looked at.)
 *	race: String; Indicates mob's race.
 *	actionFlags: String; Type of special actions mobile will take.
 *	affectFlags: String; Assigns spell/spell-life effects to mobile.
 *	alignment: Integer; Value between -1000 (evil) and 1000 (good), inclusive.
 *	mobGroup: Integer; Group number mob belongs. Will assist other mobs with
 *		same group number.
 *	level: Integer; Level of mob.
 *	hitBonus: Integer; Bonus/penalty (-2, -1, 0, 1, or 2) to hit for
 *		expert/crappy fighters.
 *	hitDice: Dice object for hit points.
 *	manaDice: Dice object for mana points.
 *	dmgDice: Dice object for damage.
 *	dmgType: String; Type of damage (description and mechanical type dealt to 
 *		attacked.)
 *
 * TODO
 *	Finish this parameter list.
 */
mobConstructor = function(paramObject) {
	var that, privateMembers, otherGetters, otherSetters, defaultGetSet, index;

	that = {};

	privateMembers = {
	};

	otherGetters = [];
	otherSetters = [];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	return(that);
};

/* Parameters (Object)
 *
 * TODO
 *	Actually write this.
 */
objConstructor = function(paramObject) {
	var that, privateMembers, otherGetters, otherSetters, defaultGetSet, index;

	that = {};

	privateMembers = {
	};

	otherGetters = [];
	otherSetters = [];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	return(that);
};


/* Parameters (Object)
 *
 * TODO
 *	Actually write this.
 */
resetConstructor = function(paramObject) {
	var that, privateMembers, otherGetters, otherSetters, defaultGetSet, index;

	that = {};

	privateMembers = {
	};

	otherGetters = [];
	otherSetters = [];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	return(that);
};

/* Parameters (Object)
 *
 * TODO
 *	Actually write this.
 */
shopConstructor = function(paramObject) {
	var that, privateMembers, otherGetters, otherSetters, defaultGetSet, index;

	that = {};

	privateMembers = {
	};

	otherGetters = [];
	otherSetters = [];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	return(that);
};

/* Parameters (Object)
 *
 * TODO
 *	Actually write this.
 */
specialConstructor = function(paramObject) {
	var that, privateMembers, otherGetters, otherSetters, defaultGetSet, index;

	that = {};

	privateMembers = {
	};

	otherGetters = [];
	otherSetters = [];

	for (index in privateMembers) {
		if (privateMembers.hasOwnProperty(index)) {
			defaultGetSet = Math.max(otherGetters.indexOf(index),
					otherSetters.indexOf(index));

			if (defaultGetSet === -1) {
				getterSetter(that, privateMembers, index);

				that[index] = paramObject[index];
			}
		}
	}

	return(that);
};

exports.typeCompare = typeCompare;
exports.setCheck = setCheck;
exports.rangeSetter = rangeSetter;
exports.elOfSetter = elOfSetter;
exports.subsetSetter = subsetSetter;
exports.areaConstructor = areaConstructor;
exports.roomConstructor = roomConstructor;
exports.exitConstructor = exitConstructor;
