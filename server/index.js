var log = require("./log");
var server = require("./server");
var db = require("./db");

db.start(function() {
	server.start(log, db.collections["users"]);
});
