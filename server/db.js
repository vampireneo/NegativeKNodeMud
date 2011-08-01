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

		authedDb(serverCallback);
	});
}

function authedDb(serverCallback) {
	//gatherCollections(collectionNames, collections, serverCallback);
	db.collections(function (err, allCollections) {
		for (var i = 0; i < allCollections.length; i++) {
			var dbName, collectionName;

			dbName = allCollections[i].db.databaseName;
			collectionName = allCollections[i].collectionName;

			if (dbName == 'mud') {
				collections[collectionName] = allCollections[i];
			}
		}

		exportExports(collections);
		serverCallback();
	});
}

function exportExports(collections) {
	exports.collections = collections;
}

exports.start = start;
