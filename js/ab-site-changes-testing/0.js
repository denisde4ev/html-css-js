




// ChatGPT powered
// https://chatgpt.com/c/67b7abaf-73c4-8000-a57a-b8bd4802342a

// this does not work 100%
// one time I got it to work for my target, but 3 times didn't
// TODO:!!! have to debug / rewrite





var blacklist = new Map(); // Stores changes in "unchanging" mode
var whitelist = new Map(); // Stores changes in "changing" mode
var comparisonCache = new Map(); // Caches comparison results
var appliedChanges = new Map(); // Caches applied changes for reversal
var trackingMode = "unchanging"; // Starts in unchanging mode

// MutationObserver to track attribute changes
var observer = new MutationObserver(mutations => {
 mutations.forEach(mutation => {
  if (mutation.type === "attributes") {
   var el = mutation.target;
   var attrName = mutation.attributeName;
   var newValue = el.getAttribute(attrName);

   // Decide where to store the change
   var storage = trackingMode === "unchanging" ? blacklist : whitelist;

   if (!storage.has(el)) {
    storage.set(el, {});
   }
   storage.get(el)[attrName] = newValue;
  }
 });
});

// Start observing changes on the document
observer.observe(document.body, { attributes: true, subtree: true });

// Function to switch tracking mode
function setTrackingMode(mode) {
 if (mode !== "unchanging" && mode !== "changing") {
  console.error("Invalid mode. Use 'unchanging' or 'changing'.");
  return;
 }
 trackingMode = mode;
 console.log(`Tracking mode set to: ${mode}`);
}

// Function to compare changes and cache the result
function compareChanges() {
 console.log("Comparing changes...");
 comparisonCache.clear();

 whitelist.forEach((whiteAttrs, el) => {
  var blackAttrs = blacklist.get(el) || {};
  var changes = {};

  Object.keys(whiteAttrs).forEach(attr => {
   if (!(attr in blackAttrs)) {
    console.log('CHANGED ONLY IN CHANGING MODE: ',el, attr, '=', whiteAttrs[attr]);
    changes[attr] = whiteAttrs[attr];
   }
  });
  if (Object.keys(changes).length > 0) {
   comparisonCache.set(el, changes);
  }
 });

 console.log("Comparison complete.");
}

// Function to apply the cached changes
function applyCachedChanges() {
 console.log("Applying cached changes...");
 appliedChanges.clear();

 // Stop observing while applying changes
 observer.disconnect();

 comparisonCache.forEach((attrs, el) => {
  var originalAttrs = {};
  Object.keys(attrs).forEach(attr => {
   originalAttrs[attr] = el.getAttribute(attr);
   el.setAttribute(attr, attrs[attr]);
  });
  appliedChanges.set(el, originalAttrs);
 });

 // Restart observing after applying changes
 observer.observe(document.body, { attributes: true, subtree: true });

 console.log("Changes applied.");
}

// Function to reverse the applied changes
function reverseAppliedChanges() {
 console.log("Reversing applied changes...");

 observer.disconnect(); // Stop observing while reverting

 appliedChanges.forEach((attrs, el) => {
  Object.keys(attrs).forEach(attr => {
   if (attrs[attr] === null) {
    el.removeAttribute(attr);
   } else {
    el.setAttribute(attr, attrs[attr]);
   }
  });
 });

 observer.observe(document.body, { attributes: true, subtree: true }); // Restart observing

 console.log("Changes reversed.");
}

if (0) {
setTrackingMode("unchanging");
setTrackingMode("changing");
compareChanges();
applyCachedChanges();
reverseAppliedChanges();
}

