#!/bin/sh


cd "${0%/*}" || exit


node --inspect-brk "$@" ./a.js 
