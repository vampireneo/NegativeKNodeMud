var server = require("./server");
var db = require("./db");

db.start();
server.start(db);
