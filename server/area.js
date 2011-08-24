var areaConstructor;
var typeCompare;

typeCompare = function(variable0, variable1) {
	var validType;

	if (Array.isArray(variable0) && Array.isArray(variable1)) {
		validType = true;
	}
	else if (typeof(variable0) === typeof(variable1)) {
		validType = true;
	}
	else {
		validType = false;
	}

	return(validType);
}

/* Parameters (Object)
 *	builder: String; Name of the area's builder.
 *	areaName: String; Area name, as will be visible by the area command.
 *	filename: String; Filename for the area to be saved in.
 *	vNumRange: Array of Integers: Range of area's vnums. Example: [6, 20].
 *	levelRange: Array of Integers; Suggested minimum and maximum levels for
 *		the area. Example: [3, 15].
 */
areaConstructor = function (paramObject) {
	var that, privateMembers, index;
	var commonSetterFunction;

	that = {};

	privateMembers = {
		  "builder": ""
		, "areaName": ""
		, "filename": ""
		, "vNumRange": []
		, "levelRange": []
		};

	setCheck = function(newVal, privateMembers, index) {
		var validVar;

		if (newVal !== undefined && typeCompare(newVal, privateMembers[index])) {
			validVar = true;
		}
		else {
			validVar = false;
		}
	};

	for (var index in privateMembers) {
		(function(index) {
			var currVal;

			currVal = privateMembers[index];

			Object.defineProperty(that, index, {
				get: function() {
					return(privateMembers[index]);
				},
				set: function(newVal) {
					if (setCheck(newVal, privateMembers[index])) {
						privateMembers[index] = newVal;
					}
				}
			});
		})(index);
	}


	that.builder = paramObject.builder;
	that.areaName = paramObject.areaName;
	that.filename = paramObject.filename;
	that.vNumRange = paramObject.vNumRange;
	that.levelRange = paramObject.levelRange;

	return(that);
};

/* Parameters
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
 */
// Finish this parameter list.
function Mob(paramObject) {
	var paramList;

	paramList = [
				  "nameList"
				, "shortDesc"
				, "longDesc"
				, "lookDesc"
				, "race"
				, "actionFlags"
				, "affectFlags"
				, "alignment"
				, "mobGroup"
				, "level"
				, "hitBonus"
				, "hitDice"
				, "manaDice"
				, "dmgDice"
				, "dmgType"
				];

	this = listToObj(paramList, paramObject);
}

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
 */
function Room(paramObject) {
	var paramList;

	paramList = [
				  "vNum"
				, "header"
				, "description"
				, "flags"
				, "sectorType"
				, "exits"
				, "extras"
				, "manaAdjust"
				, "healAdjust"
				, "clans"
				];

	this = listToObj(paramList, paramObject);
}

//function Object() {
//}

function Reset() {
}

function Shop() {
}

function Special() {
}

exports.areaConstructor = areaConstructor;
