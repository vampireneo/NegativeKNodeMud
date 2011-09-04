/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var area = require("../area.js");

var testTypeCompare, testSetCheck, testGetterSetter, testRangeSetter,
	testElOfSetter, testSubsetSetter, testArea, testRoom, testExit; 

testTypeCompare = function(test) {
	var types, innerIndex, outerIndex, innerVar, outerVar;

	types = [undefined, true, 1, "stringy!", function() {}, {"key":"value"}];

	for (outerIndex = 0; outerIndex < types.length; outerIndex++) {
		outerVar = types[outerIndex];

		for (innerIndex = 0; innerIndex < types.length; innerIndex++) {
			innerVar = types[innerIndex];
			
			if (outerIndex === innerIndex) {
				test.ok(area.typeCompare(outerVar, innerVar));
			}
			else {
				test.ok(! area.typeCompare(outerVar, innerVar));
			}
		}
	}

	test.done();
};

testSetCheck = function(test) {
	var idxOut, idxIn, innerTestParams, outerTestParams, innerVal, outerVal;

	outerTestParams = [1, 'a', [0, 1, 2], {"a":"b", "1":"chicken"}];
	innerTestParams = [2, 'z', [0, 2, 65, 'a'], {"1":"chicken"}];

	for (idxOut = 0; idxOut < outerTestParams.length; idxOut++) {
		outerVal = outerTestParams[idxOut];

		for (idxIn = 0; idxIn < innerTestParams.length; idxIn++) {
			innerVal = innerTestParams[idxIn];

			if (idxIn === idxOut) {
				test.ok(area.setCheck(outerVal, innerVal));
			}
			else {
				test.ok(! area.setCheck(outerVal, innerVal));
			}
		}
	}

	test.done();
};

testGetterSetter = function(test) {
	var fakeContainer;

	fakeContainer = {
		"key":3
	};

	fakeContainer.key = 0;
	test.strictEqual(fakeContainer.key, 0);

	test.throws(fakeContainer.key = [0, "cat", "foo"]);

	fakeContainer = {
		"key":[0]
	};
	fakeContainer.key = [0, "cat", "foo"];
	test.deepEqual(fakeContainer.key, [0, "cat", "foo"]);

	test.throws(fakeContainer.key = 0);
	test.throws(fakeContainer.key = {"key":"value"});

	fakeContainer = {
		"key":{
			"key":"bar"
		}
	};
	fakeContainer.key = {"key":"value"};
	test.deepEqual(fakeContainer.key, {"key":"value"});

	test.done();
};

testRangeSetter = function(test) {
	var fakeContainer, rangeFunction;

	fakeContainer = {
			  "key0": 4
			, "key1": "a"
	};
	
	rangeFunction = area.rangeSetter(fakeContainer, "key0", 0, 5);

	rangeFunction(2);
	test.strictEqual(fakeContainer.key0, 2);

	rangeFunction(5);
	test.strictEqual(fakeContainer.key0, 5);

	test.throws(function() {
		rangeFunction(-1);
	});

	test.throws(function() {
		rangeFunction(6);
	});

	test.done();
};

testElOfSetter = function(test) {
	var fakeContainer, elFunction, validVals;

	fakeContainer = {
			  "key0": "alpha"
			, "key1": "beta"
	};

	test.throws(function() {
		area.elOfSetter(fakeContainer, "key0", [undefined, "bar"]);
	});

	test.throws(function() {
		area.elOfSetter(fakeContainer, "key0", ["foo", [1, 2]]);
	});

	test.throws(function() {
		area.elOfSetter(fakeContainer, "key0", ["baz", {"key": "value"}]);
	});

	validVals = ["alpha", "beta", 4, -1];
	elFunction = area.elOfSetter(fakeContainer, "key0", validVals);

	elFunction("beta");
	test.strictEqual(fakeContainer.key0, "beta");

	elFunction(4);
	test.strictEqual(fakeContainer.key0, 4);

	elFunction(-1);
	test.strictEqual(fakeContainer.key0, -1);

	test.throws(function() {
		elFunction(5);
	});

	test.throws(function() {
		elFunction("foobar");
	});

	test.throws(function() {
		elFunction(["foo", 0]);
	});

	test.throws(function() {
		elFunction({"foo": "bar"});
	});

	test.done();
};

testSubsetSetter = function(test) {
	var fakeContainer, subsetFunction, validVals;

	fakeContainer = {
			  "key0": ["alpha", -5, "beta"]
			, "key1": ["alpha", 1, "beta"]
	};

	test.throws(function() {
		area.subsetSetter(fakeContainer, "key0", [undefined, "bar"]);
	});

	test.throws(function() {
		area.subsetSetter(fakeContainer, "key0", ["foo", [1, 2]]);
	});

	test.throws(function() {
		area.subsetSetter(fakeContainer, "key0", ["baz", {"key": "value"}]);
	});

	validVals = ["alpha", "beta", "gamma", -5, 0, 5];
	subsetFunction = area.subsetSetter(fakeContainer, "key0", validVals);

	subsetFunction(["alpha"]);
	test.deepEqual(fakeContainer.key0, ["alpha"]);

	subsetFunction(["alpha", "gamma", -5, 0]);
	test.deepEqual(fakeContainer.key0, ["alpha", "gamma", -5, 0]);

	subsetFunction([]);
	test.deepEqual(fakeContainer.key0, []);

	subsetFunction(["alpha", "beta", "gamma", -5, 0, 5]);
	test.deepEqual(fakeContainer.key0, ["alpha", "beta", "gamma", -5, 0, 5]);

	test.throws(function() {
		subsetFunction(["alpha", "beta", "gamma", -5, 0, 5, 8]);
	});

	test.throws(function() {
		subsetFunction(["foobar"]);
	});

	test.throws(function() {
		subsetFunction([-1]);
	});

	test.throws(function() {
		subsetFunction([[-1]]);
	});

	test.throws(function() {
		subsetFunction([{"key": "value"}]);
	});

	test.done();
};

testArea = function(test) {
	var anArea;

	anArea = area.areaConstructor({
		  "builder": "A Builder"
		, "areaName": "Scary Area"
		, "filename": "scary.are"
		, "vNumRange": [1, 20]
		, "levelRange": [3, 15]
	});
	
	test.strictEqual(anArea.builder, "A Builder");
	test.strictEqual(anArea.areaName, "Scary Area");
	test.strictEqual(anArea.filename, "scary.are");
	test.deepEqual(anArea.vNumRange, [1, 20]);
	test.deepEqual(anArea.levelRange, [3, 15]);

	anArea.builder = "newBuilder";
	anArea.areaName = "Tasty Area";
	anArea.filename = "tasty.are";
	anArea.vNumRange = [6, 7];
	anArea.levelRange = [40, 45];

	test.throws(function() {
		anArea.builder = undefined;
	});
	test.throws(function() {
		anArea.areaName = undefined;
	});
	test.throws(function() {
		anArea.filename = undefined;
	});
	test.throws(function() {
		anArea.vNumRange = undefined;
	});
	test.throws(function() {
		anArea.levelRange = undefined;
	});
	test.throws(function() {
		anArea.builder = [5, 1];
	});
	test.throws(function() {
		anArea.areaName = {};
	});
	test.throws(function() {
		anArea.filename = 4;
	});
	test.throws(function() {
		anArea.vNumRange = "bleh";
	});
	test.throws(function() {
		anArea.levelRange = {};
	});

	test.strictEqual(anArea.builder, "newBuilder");
	test.strictEqual(anArea.areaName, "Tasty Area");
	test.strictEqual(anArea.filename, "tasty.are");
	test.deepEqual(anArea.vNumRange, [6, 7]);
	test.deepEqual(anArea.levelRange, [40, 45]);

	test.done();
};

/* TODO
 *	Use real exits.
 *	Use real extras.
 */
testRoom = function(test) {
	var aRoom;

	aRoom = area.roomConstructor({
		  "vNum": 25
		, "header": "Just a room"
		, "description": "A simple room. Family portraits line the walls, basic but functional furniture lies around, and a monster in the corner is staring at you."
		, "flags": ["dark", "no mob", "private"]
		, "sectorType": "hills"
		, "exits": [null]
		, "extras": [null]
		, "manaAdjust": 85
		, "healAdjust": 20
		, "clans": [null]
	});

	test.strictEqual(aRoom.vNum, 25);
	test.strictEqual(aRoom.header, "Just a room");
	test.strictEqual(aRoom.description, "A simple room. Family portraits " +
		"line the walls, basic but functional furniture lies around, and a " +
		"monster in the corner is staring at you.");
	test.deepEqual(aRoom.flags, ["dark", "no mob", "private"]);
	test.strictEqual(aRoom.sectorType, "hills");
	test.deepEqual(aRoom.exits, [null]);
	test.deepEqual(aRoom.extras, [null]);
	test.strictEqual(aRoom.manaAdjust, 85);
	test.strictEqual(aRoom.healAdjust, 20);
	test.deepEqual(aRoom.clans, [null]);

	aRoom.vNum = 562;
	aRoom.header = "A normal room.";
	aRoom.description = "No, really. A normal room.";
	aRoom.flags = [
			  "dark"
			, "no mob"
			, "indoors"
			, "private"
			, "safe"
			, "solitary"
			, "pet shop"
			, "no recall"
	];
	aRoom.sectorType = "desert";
	aRoom.exits = [null];
	aRoom.extras = [null];
	aRoom.manaAdjust = 5;
	aRoom.healAdjust = 195;
	aRoom.clans = ["stone crows"];

	test.strictEqual(aRoom.vNum, 562);
	test.strictEqual(aRoom.header, "A normal room.");
	test.strictEqual(aRoom.description, "No, really. A normal room.");
	test.deepEqual(aRoom.flags, [
			  "dark"
			, "no mob"
			, "indoors"
			, "private"
			, "safe"
			, "solitary"
			, "pet shop"
			, "no recall"
	]);
	test.strictEqual(aRoom.sectorType, "desert");
	test.deepEqual(aRoom.exits, [null]);
	test.deepEqual(aRoom.extras, [null]);
	test.strictEqual(aRoom.manaAdjust, 5);
	test.strictEqual(aRoom.healAdjust, 195);
	test.deepEqual(aRoom.clans, ["stone crows"]);

	test.throws(function() {
		aRoom.vNum = undefined;
	});
	test.throws(function() {
		aRoom.header = undefined;
	});
	test.throws(function() {
		aRoom.description = undefined;
	});
	test.throws(function() {
		aRoom.flags = undefined;
	});
	test.throws(function() {
		aRoom.sectorType = undefined;
	});
	test.throws(function() {
		aRoom.exits = undefined;
	});
	test.throws(function() {
		aRoom.extras = undefined;
	});
	test.throws(function() {
		aRoom.manaAdjust = undefined;
	});
	test.throws(function() {
		aRoom.healAdjust = undefined;
	});
	test.throws(function() {
		aRoom.clans = undefined;
	});

	test.throws(function() {
		aRoom.vNum = "a";
	});
	test.throws(function() {
		aRoom.header = {};
	});
	test.throws(function() {
		aRoom.description = ["la"];
	});
	test.throws(function() {
		aRoom.flags = "foobar";
	});
	test.throws(function() {
		aRoom.sectorType = [5, 1];
	});
	test.throws(function() {
		aRoom.exits = {"la":[10]};
	});
	test.throws(function() {
		aRoom.extras = 0;
	});
	test.throws(function() {
		aRoom.manaAdjust = -10;
	});
	test.throws(function() {
		aRoom.healAdjust = 320;
	});
	test.throws(function() {
		aRoom.clans = "a";
	});

	test.done();
};

testExit = function(test) {
	var anExit;

	anExit = area.exitConstructor({
			  "roomVnum": 0
			, "direction": "north"
			, "description": "An exit."
			, "keywords": ["cobblestone", "path"]
			, "doorState": "nodoor"
			, "connectVnum": 1
			, "keyVnum": 0
	});

	test.strictEqual(anExit.roomVnum, 0);
	test.strictEqual(anExit.direction, "north");
	test.strictEqual(anExit.description, "An exit.");
	test.deepEqual(anExit.keywords, ["cobblestone", "path"]);
	test.strictEqual(anExit.doorState, "nodoor");
	test.strictEqual(anExit.connectVnum, 1);
	test.strictEqual(anExit.keyVnum, 0);

	anExit.roomVnum = 271;
	anExit.direction = "south";
	anExit.description = "A massive cold iron door.";
	anExit.keywords = ["iron", "door"];
	anExit.doorState = "locked";
	anExit.connectVnum = 275;
	anExit.keyVnum = 271;

	test.strictEqual(anExit.roomVnum, 271);
	test.strictEqual(anExit.direction, "south");
	test.strictEqual(anExit.description, "A massive cold iron door.");
	test.deepEqual(anExit.keywords, ["iron", "door"]);
	test.strictEqual(anExit.doorState, "locked");
	test.strictEqual(anExit.connectVnum, 275);
	test.strictEqual(anExit.keyVnum, 271);

	test.throws(function() {
		anExit.roomVnum = undefined;
	});
	test.throws(function() {
		anExit.direction = undefined;
	});
	test.throws(function() {
		anExit.description = undefined;
	});
	test.throws(function() {
		anExit.keywords = undefined;
	});
	test.throws(function() {
		anExit.doorState = undefined;
	});
	test.throws(function() {
		anExit.connectVnum = undefined;
	});
	test.throws(function() {
		anExit.keyVnum = undefined;
	});

	test.throws(function() {
		aRoom.roomVnum = "a";
	});
	test.throws(function() {
		aRoom.direction = [0, "foo"];
	});
	test.throws(function() {
		aRoom.direction = "southwest";
	});
	test.throws(function() {
		aRoom.description = 5;
	});
	test.throws(function() {
		aRoom.keywords = "alpha";
	});
	test.throws(function() {
		aRoom.doorState = {"key": "value"};
	});
	test.throws(function() {
		aRoom.doorState = "aleph";
	});
	test.throws(function() {
		aRoom.connectVnum = "bar";
	});
	test.throws(function() {
		aRoom.keyVnum = ["baz"];
	});

	test.done();
};

exports.testSetCheck = testSetCheck;
exports.testRangeSetter = testRangeSetter;
exports.testGetterSetter = testGetterSetter;
exports.testElOfSetter = testElOfSetter;
exports.testTypeCompare = testTypeCompare;
exports.testSubsetSetter = testSubsetSetter;

exports.testArea = testArea;
exports.testRoom = testRoom;
exports.testExit = testExit;
