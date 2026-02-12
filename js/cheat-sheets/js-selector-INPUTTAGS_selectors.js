

/*
https://github.com/philc/vimium/blob/3c4e6da46a6ebae93232ae6dddb65c293e97611a/content_scripts/mode_normal.js#L375
:is(input:is([type=text],[type=search],[type=email],[type=url],[type=number],[type=password],[type=date],[type=tel]),textarea,[contenteditable]):not(:disabled,:readonly,[readonly],[disabled])

// but this does not seem like full
*/




// https://github.com/tridactyl/tridactyl/blob/50f19a34fc5f1006a7fccd93e35bca41eb011942/src/excmds.ts#L2434C14-L2434C33
export const INPUTTAGS_selectors = `
input:not([disabled]):not([readonly]):-moz-any(
 :not([type]),
 [type='text'],
 [type='search'],
 [type='password'],
 [type='datetime'],
 [type='datetime-local'],
 [type='date'],
 [type='month'],
 [type='time'],
 [type='week'],
 [type='number'],
 [type='range'],
 [type='email'],
 [type='url'],
 [type='tel'],
 [type='color']
),
textarea:not([disabled]):not([readonly]),
object,
[role='application'],
[contenteditable='true'][role='textbox']
`

// https://github.com/tridactyl/tridactyl/blob/50f19a34fc5f1006a7fccd93e35bca41eb011942/src/lib/dom.ts#L620
// CSS selectors. More readable for web developers. Not dead. Leaves browser to care about XML.
export const HINTTAGS_selectors = `
input:not([type=hidden]):not([disabled]),
a,
area,
button,
details,
iframe,
label,
select,
summary,
textarea,
[onclick],
[onmouseover],
[onmousedown],
[onmouseup],
[oncommand],
[role='link'],
[role='button'],
[role='checkbox'],
[role='combobox'],
[role='listbox'],
[role='listitem'],
[role='menuitem'],
[role='menuitemcheckbox'],
[role='menuitemradio'],
[role='option'],
[role='radio'],
[role='scrollbar'],
[role='slider'],
[role='spinbutton'],
[role='tab'],
[role='textbox'],
[role='treeitem'],
[class*='button'],
[tabindex]
`



todo more
