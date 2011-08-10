#!/bin/bash
mongoexport --db mud -c users -o dump/users.json
mongoexport --db mud -c areas -o dump/areas.json
mongoexport --db mud -c mobs -o dump/mobs.json
mongoexport --db mud -c rooms -o dump/rooms.json
