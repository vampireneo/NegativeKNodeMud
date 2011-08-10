#!/bin/bash
mongoimport --db mud --collection users --file dump/users.json
mongoimport --db mud --collection rooms --file dump/rooms.json
mongoimport --db mud --collection areas --file dump/areas.json
mongoimport --db mud --collection objs --file dump/objs.json
