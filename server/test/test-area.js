/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var area = require("../area.js");

var testTypeCompare, testArea;

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

exports.testTypeCompare = testTypeCompare;
exports.testArea = testArea;
