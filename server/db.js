var mongo = require("mongodb");
var log = require("./log");

var dbConn, user, password;
var exportedDb, collections;

collections = new Array();
collectionNames = ["users", "areas", "rooms", "mobs"];

// Herp derp conf file.
user = "user";
password = "password";

function start(serverCallback) {
	dbConn = new mongo.Db("mud", new mongo.Server("127.0.0.1", 27017, 
	  {auto_reconnect:true}), {});

	dbConn.open(function(err, dbConn) {
		if(err) {
			var logMsg;

			logMsg = "Failed to open DB connection.\n" + err;
			log.print(0, logMsg);
		}

		log.print(3, "Opened DB connection.\n\t" + dbConn);
		openedDb(user, password, serverCallback);
	});
}

function openedDb(user, password, serverCallback) {
	dbConn.authenticate(user, password, function(err, result) {
		if(err) {
			log.print(0, err);
		}

		if(!result) {
			log.print(0, "Failed to authenticate to database.\n" + err);
		}

		log.print(3, "Authenticated to database.\n\t" + result);

		authedDb(serverCallback);
	});
}

function authedDb(serverCallback) {
	dbConn.collections(function (err, allCollections) {
		for (var i = 0; i < allCollections.length; i++) {
			var dbName;

			dbName = allCollections[i].db.databaseName;

			if ("mud" == dbName) {
				var collectionName;

				collectionName = allCollections[i].collectionName;
				collections[collectionName] = allCollections[i];
			}
		}

		for (var i in collectionNames) {
			var name;
			
			name = collectionNames[i];

			if (undefined === collections[name]) {
				log.print(0, "Unable to find collection " + name);
			}
		}
		exportExports(collections);
		serverCallback();
	});
}

/* Parameters 
 *	userName: Username to look up.
 *	callBack: Callback function.
 * callBack parameters
 *	err: ( undefined => "Successful lookup",
 *				 err => "db error",
 *				  -1 => "Invalid username")
 *	document: Lookup results from "users" collection.
 */
function userNameLookup(userName, callBack) {
	if (userName.match(/[A-Za-z ]+/)) {
		var userQuery;

		userQuery = {"user": userName};
		findOne("users", userQuery, callBack);
	}
	else {
		callBack(-1, {});
	}
}

/* Parameters
 *	collectionName:
 *	query: 
 *	callBack: Callback function.
 * callBack parameters
 *	errorCode: (
 *	document: Lookup results from collectionName.
 */
function findOne(collectionName, query, callBack) {
	var collection;

	collection = collections[collectionName];

	collection.findOne(query, function(err, document) {
		if (err) {
			var logMsg, userMsg;

			logMsg = "Failed to look up user '" + credentials.user +
			  "' in database.\n" + err;
			userMsg = "Error when attempting to look up username";
			callBack(err, document);
		}
		else {
			callBack(undefined, document);
		}
	});
}

function exportExports(collections) {
	exports.collections = collections;
}

exports.start = start;
exports.userNameLookup = userNameLookup;
