/*jslint node: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var log, db, parser, server;

log = require("./log");
db = require("./db");
parser = require("./parser");
server = require("./server");

db.start(function() {
	parser.start(db);
	server.start(log, parser.Machine, db.collections["users"]);
});
