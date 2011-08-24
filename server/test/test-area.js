var area = require("../area.js");

var areaTest = function(test) {
	var anArea, areaFunctions, index;

	areaFunctions = [
					  "setBuilder"
					, "setAreaName"
					, "setFilename"
					, "setVNumRange"
					, " setLevelRange"
					];

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

/*
	for (index = 0; index < areaFunctions.length; index++) {
		test.throws(function() {
			var aFunction;

			aFunction = areaFunctions[index];

			anArea[aFunction]();
		});
	}

	test.throws(function() {
		anArea.setBuilder([5, 1]);
	});
	test.throws(function() {
		anArea.setAreaName({});
	});
	test.throws(function() {
		anArea.setFilename(4);
	});
	test.throws(function() {
		anArea.setVNumRange("bleh");
	});
	test.throws(function() {
		anArea.setLevelRange({});
	});
*/

	test.strictEqual(anArea.builder, "newBuilder");
	test.strictEqual(anArea.areaName, "Tasty Area");
	test.strictEqual(anArea.filename, "tasty.are");
	test.deepEqual(anArea.vNumRange, [6, 7]);
	test.deepEqual(anArea.levelRange, [40, 45]);

	test.done();
};
/*
var areaTest = function(test) {
	var anArea, areaFunctions, index;

	areaFunctions = [
					  "setBuilder"
					, "setAreaName"
					, "setFilename"
					, "setVNumRange"
					, " setLevelRange"
					];

	anArea = area.areaConstructor({
		  "builder": "A Builder"
		, "areaName": "Scary Area"
		, "filename": "scary.are"
		, "vNumRange": [1, 20]
		, "levelRange": [3, 15]
	});
	
	test.strictEqual(anArea.getBuilder(), "A Builder");
	test.strictEqual(anArea.getAreaName(), "Scary Area");
	test.strictEqual(anArea.getFilename(), "scary.are");
	test.deepEqual(anArea.getVNumRange(), [1, 20]);
	test.deepEqual(anArea.getLevelRange(), [3, 15]);

	anArea.setBuilder("newBuilder");
	anArea.setAreaName("Tasty Area");
	anArea.setFilename("tasty.are");
	anArea.setVNumRange([6, 7]);
	anArea.setLevelRange([40, 45]);

	for (index = 0; index < areaFunctions.length; index++) {
		test.throws(function() {
			var aFunction;

			aFunction = areaFunctions[index];

			anArea[aFunction]();
		});
	}

	test.throws(function() {
		anArea.setBuilder([5, 1]);
	});
	test.throws(function() {
		anArea.setAreaName({});
	});
	test.throws(function() {
		anArea.setFilename(4);
	});
	test.throws(function() {
		anArea.setVNumRange("bleh");
	});
	test.throws(function() {
		anArea.setLevelRange({});
	});

	test.strictEqual(anArea.getBuilder(), "newBuilder");
	test.strictEqual(anArea.getAreaName(), "Tasty Area");
	test.strictEqual(anArea.getFilename(), "tasty.are");
	test.deepEqual(anArea.getVNumRange(), [6, 7]);
	test.deepEqual(anArea.getLevelRange(), [40, 45]);

	test.done();
};
*/

exports.areaTest = areaTest;
