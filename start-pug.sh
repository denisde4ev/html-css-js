#!/bin/sh -x
set -u

cd "${0%/*}" || exit

o=${0##*/}
o=${o%".sh"}


# command -v pug >/dev/null 2>&- || pug() { npx pug "$@"; }

pug -w . "$@" -O "$(


	printf %s\\n "{${o+

		HTML_FILES: "$(
			find ./[!._%]*[!~] -iname '*.html' -print0 | node -p '
				JSON.stringify(
					fs.readFileSync(0).toString()
						.match(/[^\0]+/g)
						.map(v=>v.replace(/^.\//,""))
				)
			'
		)"

		}}"


)"

