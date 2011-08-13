function Area(name, minLevel, maxLevel, minVNum, maxVNum, areaBuilder) {
	this.areaName = name;
	this.levelRange = [minLevel, maxLevel];
	this.builder = builder;
	this.vNumRange = [minVNum, maxVNum];
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
 *	hitDice: Dice object.
 *	manaDice: Dice object.
 *	dmgDice: Dice object.
 *	dmgType: String; Type of damage (description and mechanical type dealt to 
 *		attacked.
 *	
 */
// Finish this parameter list.
function Mob(paramObject) {
	for (var property in paramNames) {
		if (params.hasOwnProperty(property)) {
			this[property] = paramObject[property];
		}
	} 
}

function Object() {
}

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
