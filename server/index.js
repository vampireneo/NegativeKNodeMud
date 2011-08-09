var log = require("./log");
var db = require("./db");
var parser = require("./parser");
var server = require("./server");

db.start(function() {
	parser.start(db);
	server.start(log, parser.Machine, db.collections["users"]);
});
