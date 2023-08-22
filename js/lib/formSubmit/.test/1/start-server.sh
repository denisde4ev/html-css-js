#!/bin/sh
cd "${0%/*}" || exit
exec http-server
