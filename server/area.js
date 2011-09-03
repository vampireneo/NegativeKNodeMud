/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var typeCompare, getterSetter, setCheck, rangeSetter, areaConstructor,
	roomConstructor, exitConstructor,
	mobConstructor, objConstructor, resetConstructor, //Unwritten
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
 *	memberContainer: Object which contains index key.
 *	index: Key to value which is to be set.
 *	minVal: Minimum allowed value.
 *	maxVal: Maximum allowed value.
 *
 * Returns
 *	setterFunction: Setter function for index in memberContainer.
 */
rangeSetter = function(memberContainer, index, minVal, maxVal) {
	var currVal, setterFunction;

	currVal = memberContainer[index];

	setterFunction = function(newVal) {
		if (setCheck(newVal, currVal) && minVal <= newVal && newVal <= maxVal) {
			memberContainer[index] = newVal;
		}
		else {
			throw(new Error("Invalid value for " + index + ": " + newVal));
		}
	};

	return(setterFunction);
};

/* Parameters
 *	that: Object to operate on.
 *	memberContainer: Object which contains all valid members of that.
 *	index: Key to appropriate member in memberContainer.
 *	getter: Optional get function for member. If undefined, will simply return
 *		the value of the member.
 *	setter: Optional set function for member. If undefined, will simply set the
 *		value of the member to the passed newVal, assuming it's defined and
 *		matches type.
 *
 * Returns
 *	None.
 */
getterSetter = function(that, memberContainer, index, getter, setter) {
	var currVal;

	currVal = memberContainer[index];

	if (undefined === getter) {
		getter = function() {
			return(memberContainer[index]);
		};
	}

	if (undefined === setter) {
		setter = function(newVal) {
			if (setCheck(newVal, currVal)) {
				memberContainer[index] = newVal;
			}
			else {
				throw(new Error("Invalid value for " + index + ": " + newVal));
			}
		};
	}

	Object.defineProperty(that, index, {
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
 *		* flags - elementOfSetter
 *		* sectorType - elementOfSetter
 */
roomConstructor = function(paramObject) {
	var that, privateMembers, index, otherGetters, otherSetters, defaultGetSet;

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
	otherSetters = ["manaAdjust", "healAdjust"];

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
 *		* direction - elementOfSetter
 *		* doorState - elementOfSetter
 */
exitConstructor = function(paramObject) {
	var that, privateMembers;

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
mobConstructor = function() {
	var that;

	return(that);
};

/* Parameters (Object)
 *
 * TODO
 *	Actually write this.
 */
objConstructor = function() {
	var that, privateMembers;

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
resetConstructor = function() {
	var that, privateMembers;

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
shopConstructor = function() {
	var that, privateMembers;

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
specialConstructor = function() {
	var that, privateMembers;

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
exports.areaConstructor = areaConstructor;
exports.roomConstructor = roomConstructor;
