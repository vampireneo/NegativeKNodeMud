var log = require("./log");
var server = require("./server");
var db = require("./db");

db.start(log);
server.start(log, db);
