#!/bin/sh -x
set -u

cd "${0%/*}" || exit

o=${0##*/}
o=${o%".sh"}


# command -v pug >/dev/null 2>&- || pug() { npx pug "$@"; }

case ${0##*/} in
	start-pug.sh|start-pug) pugopt='-wP';;
	build-pug.sh|build-pug) pugopt='-P';;
	*) echo >&2 "unknown \$0=${0}"; exit 2;;
esac

case $# in 0) set -- .; esac
pug $pugopt "$@" -O "{
	require,fs,path,
	HTML_FILES: $(
		find ./[!._%]*[!~] -iname '*.html' -print0 | node -p '
			JSON.stringify(
				fs.readFileSync(0).toString()
					.match(/[^\0]+/g).sort()
					.map(v=>v.replace(/^.\//,""))
			)
		'
	)
}"

