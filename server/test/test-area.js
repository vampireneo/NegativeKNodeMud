/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var area = require("../area.js");

var testTypeCompare, testSetCheck, testGetterSetter, testArea, testRoom,
	testRangeSetter;

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
			  "key": 4
	};
	
	rangeFunction = area.rangeSetter(fakeContainer, "key", 0, 5);

	rangeFunction(2);
	test.strictEqual(fakeContainer.key, 2);

	rangeFunction(5);
	test.strictEqual(fakeContainer.key, 5);

	test.throws(function() {
		rangeFunction(-1);
	});

	test.throws(function() {
		rangeFunction(6);
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

testRoom = function(test) {
	var aRoom;

	aRoom = area.roomConstructor({
		  "vNum": 25
		, "header": "Just a room"
		, "description": "A simple room. Family portraits line the walls, basic but functional furniture lies around, and a monster in the corner is staring at you."
		, "flags": ["A", "C", "D"]
		, "sectorType": 5
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
	test.deepEqual(aRoom.flags, ["A", "C", "D"]);
	test.strictEqual(aRoom.sectorType, 5);
	test.deepEqual(aRoom.exits, [null]);
	test.deepEqual(aRoom.extras, [null]);
	test.strictEqual(aRoom.manaAdjust, 85);
	test.strictEqual(aRoom.healAdjust, 20);
	test.deepEqual(aRoom.clans, [null]);

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
		aRoom.flags = "F";
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

exports.testSetCheck = testSetCheck;
exports.testRangeSetter = testRangeSetter;
exports.testGetterSetter = testGetterSetter;
exports.testTypeCompare = testTypeCompare;
exports.testArea = testArea;
exports.testRoom = testRoom;
