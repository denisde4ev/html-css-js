#!/bin/sh
cd "${0%/*}" || exit
exec node ./server.sh
