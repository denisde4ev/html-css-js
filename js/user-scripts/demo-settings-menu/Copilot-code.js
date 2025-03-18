// ==UserScript==
// @name         Complex Menu Example
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Creates a complex menu with five settings
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const settingsCount = 5;
    const settings = {};

    // Initialize settings with default values or saved values
    for (let i = 1; i <= settingsCount; i++) {
        settings[i] = GM_getValue(`setting${i}`, i);
    }

    // Function to update a setting
    function updateSetting(index) {
        const current = settings[index];
        const newValue = prompt(`1 setting: (acceptable 1 - 10) (current: ${current})`, current);

        if (newValue !== null && !isNaN(newValue) && newValue >= 1 && newValue <= 10) {
            settings[index] = parseInt(newValue, 10);
            GM_setValue(`setting${index}`, settings[index]);
            refreshMenuCommands();
        } else {
            alert('Invalid input. Please enter a number between 1 and 10.');
        }
    }

    // Function to refresh menu commands
    function refreshMenuCommands() {
        // Unregister old commands
        for (let i = 1; i <= settingsCount; i++) {
            if (typeof GM_unregisterMenuCommand === 'function') {
                GM_unregisterMenuCommand(`setting${i}`);
            }
        }

        // Register new commands
        for (let i = 1; i <= settingsCount; i++) {
            GM_registerMenuCommand(`1 setting: ${settings[i]}`, () => updateSetting(i));
        }
    }

    // Initial menu command registration
    refreshMenuCommands();
})();
