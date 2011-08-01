var mongo = require("mongodb");
var log = require("./log");

var db, user, password;
var exportedDb, collections;

collections = new Array();

// Herp derp conf file.
user = "user";
password = "password";
collectionNames = ["users", "areas", "rooms", "mobs"];

function start(serverCallback) {
	db = new mongo.Db("mud", new mongo.Server("127.0.0.1", 27017, 
	{auto_reconnect:true}), {});

	db.open(function(err, db) {
		if(err) {
			var logMsg;

			logMsg = "ERR: Failed to open DB connection.\n" + err;
			log.print(0, logMsg);
		}

		openedDb(user, password, serverCallback);
	});
}

function openedDb(user, password, serverCallback) {
	db.authenticate(user, password, function(err, result) {
		if(err) {
			log.print(0, "ERR: " + err);
		}
		else if(!result) {
			log.print(0, "ERR: Failed to authenticate to database.");
		}

		authedDb(result, serverCallback);
	});
}

function authedDb(err, result, serverCallback) {
	//gatherCollections(collectionNames, collections, serverCallback);
	db.collections(function (err, collectionRefs) {
		collections = collectionRefs;

		exportExports(collections);
		serverCallback();
	});
}

/*
function gatherCollections(oldNameList, collections, serverCallback) {
	var name, nameList;

	nameList = oldNameList;
	name = nameList.pop();

	db.collection(name, function(err, newCollection) {
		if(err) {
			var logMsg;

			logMsg = "ERR: Failed to access collection.\n" + err;
			log.print(0, logMsg);
		}
		else if(!newCollection) {
			var logMsg;

			logMsg = "ERR: Null collection returned.";
			log.print(0, logMsg);
		}

		collections[name] = newCollection;

		if(nameList.length > 0) {
			gatherCollections(nameList, collections);
		}
		else {
			exportExports(collections);
			serverCallback(collections);
		}
	});
}
*/

function exportExports(collections) {
	exports.collections;
}

exports.start = start;
