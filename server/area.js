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
 */
// Holy crap. Fix this parameter list.
// Also, finish this parameter list.
function Mob(vNum, nameList, shortDesc, longDesc, lookDesc, race, actionFlags, affectFlags, alignment, mobGroup, level, hitBonus, hitDice, manaDice, dmgDice, dmgType, 
) {
	this.vNum = vNum;
	this.nameList = [nameList];
	this.shortDesc = shortDesc;
	this.longDesc = longDesc;
	this.lookDesc = lookDesc;
	this.race = race;
	this.actionFlags = actionFlags;
	this.affectFlags = affectFlags;
	this.alignment = alignment
	this.mobGroup = mobGroup;
	this.level = level;
	this.hitBonus = hitBonus
	this.hitDice  = hitDice;
	this.manaDice  = manaDice;
	this.dmgDice  = dmgDice;
	this.dmgType = dmgType;
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
