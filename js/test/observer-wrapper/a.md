/* prompt  (auto wrap)
can you fiind any js npm package or lib that attaches mutation observer and makes it easier to
use as event listener or like event like calling observeLib(parrent, options, callback) and
callback recieves (element, options) options is what have changed object from mutations observer
like the attributes or created removed

*/

Here are several npm packages that provide easier APIs for MutationObserver:

## 1. **arrive.js** - Most Popular
```bash
npm install arrive
```

```javascript
import { arrive } from 'arrive';

// Watch for new elements
document.arrive('.my-class', function(element) {
  console.log('New element with .my-class:', element);
});

// Watch for removed elements
document.leave('.my-class', function(element) {
  console.log('Element removed:', element);
});
```

## 2. **mutation-summary** (Google's library)
```bash
npm install mutation-summary
```

```javascript
import MutationSummary from 'mutation-summary';

const observer = new MutationSummary({
  callback: function(summaries) {
    const summary = summaries[0];
    console.log('Added:', summary.added);
    console.log('Removed:', summary.removed);
    console.log('Attribute changes:', summary.attributeChanged);
  },
  queries: [
    { element: '.my-class' },
    { attribute: 'data-value' }
  ]
});
```

## 3. **observer-util** - Modern Wrapper
```bash
npm install observer-util
```

```javascript
import { observe } from 'observer-util';

const unobserve = observe(targetElement, (changes) => {
  changes.forEach(change => {
    console.log('Type:', change.type);
    console.log('Target:', change.target);
    console.log('Added nodes:', change.addedNodes);
    console.log('Removed nodes:', change.removedNodes);
  });
});
```

## 4. **dom-observer** - Simple Event-like API
```bash
npm install dom-observer
```

```javascript
import DOMObserver from 'dom-observer';

const observer = new DOMObserver(document.body, {
  childList: true,
  attributes: true,
  subtree: true
});

observer.on('childList', (mutations) => {
  mutations.forEach(mutation => {
    console.log('Children changed:', mutation.target);
  });
});

observer.on('attributes', (mutations) => {
  mutations.forEach(mutation => {
    console.log('Attribute changed:', mutation.attributeName);
  });
});
```

## 5. **Custom Wrapper** (if you want to build your own)
```javascript
function observeLib(parent, options, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      const changes = {
        type: mutation.type,
        addedNodes: Array.from(mutation.addedNodes),
        removedNodes: Array.from(mutation.removedNodes),
        attributeName: mutation.attributeName,
        oldValue: mutation.oldValue
      };
      callback(mutation.target, changes);
    });
  });

  observer.observe(parent, options);
  return observer;
}

// Usage
observeLib(document.body, {
  childList: true,
  attributes: true,
  subtree: true
}, (element, changes) => {
  console.log('Element:', element);
  console.log('Changes:', changes);
});
```

**Recommendation**: **arrive.js** is probably the most popular and user-friendly for watching element additions/removals. For more comprehensive mutation tracking, **mutation-summary** or **observer-util** would be better choices.




------------------

the ai recommended me to use:
```
arrive
mutation-summary
observer-util
dom-observer
```

and at the end new custom implementation
