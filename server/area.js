/* Parameters
 *	paramList: Array; Strings for parameter names.
 *	params: Passed object containing only parameters.
 */
var listToObj(paramList, params) {
	var objReturn;

	paramList.forEach(function(value) {
		if (params[value] === undefined) {
			throw("Object parameter " + value + " is undefined.");
		}
		else {
			objReturn[value] = params[value];
		}
	});

	return(objReturn);
}

/* Parameters (Object)
 *	areaName: String; Area name, as will be visible by the area command.
 *	filename: String; Filename for the area to be saved in.
 *	levelRange: Array; Suggested minimum and maximum levels for the area.
 *	vNumRange: Array: Range of area's vnums.
 *	builder: String; Name of the area's builder.
 */
function Area(params) {
	var paramList;

	paramList = [
					"areaName", "filename"
				  , "levelRange", "builder"
				  , "vNumRange"
				];

// This won't work if you want methods.
	this = listToObj(paramList);
}

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
					"nameList", "shortDesc"
				  , "longDesc", "lookDesc"
				  , "race", "actionFlags"
				  , "affectFlags", "alignment"
				  , "mobGroup", "level"
				  , "hitBonus", "hitDice"
				  , "manaDice", "dmgDice"
				  , "dmgType"
				];

	this = listToObj(paramList);
}

//function Object() {
//}

function Room(id) {
	this.id = id;
	this.title = "";
	this.description = "";
}

function Reset() {
}

function Shop() {
}

function Special() {
}
