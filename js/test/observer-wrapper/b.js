/**
 * observeLib - Mutation observer wrapper with simplified API
 * @param {Node} parent - DOM node to observe
 * @param {MutationObserverInit} options - Observation configuration
 * @param {Function} callback - Callback function (element, changes)
 * @returns {MutationObserver} - The created observer instance
 */
function observeLib(parent, options, callback) {
	if (!(parent instanceof Node)) {
		throw new Error('First argument must be a DOM Node');
	}

	const observer = new MutationObserver((mutations) => {
		mutations.forEach(record => {
			const changes = processMutationRecord(record);
			if (changes) {
				callback.call(parent, record.target, changes);
			}
		});
	});

	observer.observe(parent, options);
	return observer;
}

/**
 * Process MutationRecord into simplified change object
 * @param {MutationRecord} record - Mutation record from observer
 * @returns {Object} - Simplified change description
 */
function processMutationRecord(record) {
	const baseChange = {
		type: record.type,
		target: record.target,
		timestamp: record.timestamp
	};

	switch (record.type) {
		case 'attributes':
			return {
				...baseChange,
				attributeName: record.attributeName,
				attributeNamespace: record.attributeNamespace,
				oldValue: record.oldValue
			};

		case 'childList':
			return {
				...baseChange,
				addedNodes: Array.from(record.addedNodes),
				removedNodes: Array.from(record.removedNodes),
				nextSibling: record.nextSibling,
				previousSibling: record.previousSibling
			};

		case 'characterData':
			return {
				...baseChange,
				oldValue: record.oldValue
			};

		default:
			return baseChange;
	}
}

// Example usage:
const observer = observeLib(
	document.getElementById('target'),
	{
		attributes: true,
		childList: true,
		subtree: true,
		characterData: true
	},
	(element, changes) => {
		console.log('Mutation detected on:', element);
		console.log('Changes:', changes);
		
		if (changes.type === 'attributes') {
			console.log(`Attribute ${changes.attributeName} changed`);
		}
		
		if (changes.type === 'childList') {
			console.log(`${changes.addedNodes.length} nodes added`);
			console.log(`${changes.removedNodes.length} nodes removed`);
		}
	}
);

// Later to stop observing:
// observer.disconnect();
