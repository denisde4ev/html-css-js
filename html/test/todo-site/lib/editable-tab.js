/* prompt
implement tab button detection for content editable.


tab button detection when focused in contenteditable tab, it should be only in that element directly focused.
it should detect if only tab key is pressed (no modifyer keys) (except for shift)
it sholud detect at what position is the cursor. it should make shure after inputing tab char, the cursor is after it.
it should detect if text selected and in that case, it should add tab to the start of the line.
if shift + tab pressed should remove from the line one tab at the start (if no tabs to remov do nothing)

and should do it for each line (when selected a text) removing and adding tab at the start

-----


you’re crafting a custom indentation module for a web-based editor built on a single contenteditable element:

    Detect Tab (no modifiers except Shift) only when the editor is directly focused, preventing the browser’s default behavior.

    On plain Tab:

        Insert a \t character at the caret position.

        Ensure the caret moves immediately after the inserted tab.

    When text spans multiple lines:

        For Tab: prepend \t to the start of each line in the selection.

        For Shift+Tab: remove one leading \t per line (skip lines without tabs).

    Handle edge cases such as empty lines, nested inline elements, and mixed text nodes.

    Discuss how you’d:

        Detect and manage focus state and modifier keys.

        Keep the logic modular and performant even in large documents.

        Preserve accessibility (ARIA roles, announcements) and cross-browser consistency.

        Integrate with undo/redo stacks and provide robust unit and integration tests.
*/


// Prettier printWidth: 80

document.addEventListener('keydown', function (e) {
  // Only handle Tab (with or without Shift, but no other modifiers)
  if (
    e.key !== 'Tab' ||
    e.ctrlKey ||
    e.altKey ||
    e.metaKey
  ) {
    return;
  }

  // Only act if the event target is a contenteditable element,
  // and is directly focused (not a descendant)
  const el = e.target;
  if (
    !el.isContentEditable ||
    el !== document.activeElement
  ) {
    return;
  }

  // Try to handle the tab action
  const success = handleTabInContentEditable(el, e.shiftKey);

  // Only prevent default if we actually handled the tab
  if (success) {
    e.preventDefault();
  }
});

function handleTabInContentEditable(el, isShift) {
  const sel = window.getSelection();
  if (!sel.rangeCount) return false;
  const range = sel.getRangeAt(0);

  // Only handle if selection is inside the target element
  if (!el.contains(range.startContainer) || !el.contains(range.endContainer)) {
    return false;
  }

  // If selection is collapsed, insert tab at caret
  if (sel.isCollapsed) {
    return insertTabAtCaret(range, sel);
  }

  // Otherwise, indent/unindent each line in the selection
  return indentSelectedLines(el, range, sel, isShift);
}

function insertTabAtCaret(range, sel) {
  // Insert a tab character at the caret
  const tabNode = document.createTextNode('\t');
  range.deleteContents();
  range.insertNode(tabNode);

  // Move caret after the tab
  range.setStartAfter(tabNode);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  return true;
}

function indentSelectedLines(el, range, sel, isShift) {
  // Expand selection to cover full lines
  // We'll work with plain text for simplicity and robustness
  const preRange = range.cloneRange();
  preRange.setStartBefore(el);
  preRange.setEndAfter(el);

  // Get the full text content of the element
  const fullText = el.innerText;
  // Get the selection offsets
  const selectionStart = getTextOffset(el, range.startContainer, range.startOffset);
  const selectionEnd = getTextOffset(el, range.endContainer, range.endOffset);

  // Get the selected text
  const selectedText = fullText.slice(selectionStart, selectionEnd);

  // Split into lines
  const lines = selectedText.split('\n');
  let changed = false;
  let newLines;

  if (isShift) {
    // Remove one leading tab from each line (if present)
    newLines = lines.map(line => {
      if (line.startsWith('\t')) {
        changed = true;
        return line.slice(1);
      }
      return line;
    });
  } else {
    // Add a tab to the start of each line
    newLines = lines.map(line => {
      changed = true;
      return '\t' + line;
    });
  }

  if (!changed) return false;

  // Replace the selected text with the new text
  const newText = newLines.join('\n');
  const before = fullText.slice(0, selectionStart);
  const after = fullText.slice(selectionEnd);

  // Set the new content
  el.innerText = before + newText + after;

  // Restore selection
  // Calculate new selection range
  let newStart = selectionStart;
  let newEnd = selectionStart + newText.length;
  if (!isShift) {
    // If indenting, move selection right by one per line
    newStart += 1;
    newEnd += lines.length;
  } else {
    // If unindenting, move selection left by one per line (if tabs were present)
    const tabsRemoved = lines.filter(line => line.startsWith('\t')).length;
    newStart -= Math.min(newStart, tabsRemoved);
    newEnd -= tabsRemoved;
  }
  setSelectionByOffset(el, newStart, newEnd);

  return true;
}

// Helper: Get text offset within element for a given node/offset
function getTextOffset(root, node, offset) {
  let chars = 0;
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let found = false;
  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (current === node) {
      chars += offset;
      found = true;
      break;
    } else {
      chars += current.textContent.length;
    }
  }
  if (!found) {
    // Fallback: if node is the root itself (empty)
    if (node === root) return offset;
    return chars;
  }
  return chars;
}

// Helper: Set selection by character offsets within element
function setSelectionByOffset(root, start, end) {
  const sel = window.getSelection();
  sel.removeAllRanges();
  const range = document.createRange();

  let chars = 0;
  let startNode = null, startOffset = 0;
  let endNode = null, endOffset = 0;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    const len = walker.currentNode.textContent.length;
    if (!startNode && chars + len >= start) {
      startNode = walker.currentNode;
      startOffset = start - chars;
    }
    if (!endNode && chars + len >= end) {
      endNode = walker.currentNode;
      endOffset = end - chars;
      break;
    }
    chars += len;
  }

  if (!startNode) {
    startNode = root;
    startOffset = 0;
  }
  if (!endNode) {
    endNode = root;
    endOffset = 0;
  }

  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  sel.addRange(range);
}
