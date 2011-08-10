#!/bin/bash
mongoexport --db mud -c users > dump/users.json
mongoexport --db mud -c areas > dump/areas.json
mongoexport --db mud -c mobs > dump/mobs.json
mongoexport --db mud -c rooms > dump/rooms.json
