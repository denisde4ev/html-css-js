#!/bin/sh


cd "${0%/*}" || exit


node "$@" ./a.js 
