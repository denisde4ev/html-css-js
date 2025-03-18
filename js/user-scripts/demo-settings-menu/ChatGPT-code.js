// ==UserScript==
// @name         Complex GM Menu Settings
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A script to manage complex settings using GM_registerMenuCommand
// @author       You
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const settingsCount = 5;
    let menuCommands = {};

    function updateMenu() {
        // Unregister old commands
        Object.values(menuCommands).forEach(id => GM_unregisterMenuCommand(id));
        menuCommands = {};

        for (let i = 1; i <= settingsCount; i++) {
            let savedValue = GM_getValue(`setting${i}`, i); // Default value is i
            let title = `${i} setting: ${savedValue}`;

            menuCommands[i] = GM_registerMenuCommand(title, () => changeSetting(i, savedValue));
        }
    }

    function changeSetting(settingNum, currentValue) {
        let newValue = prompt(`${settingNum} setting: (acceptable 1 - 10) (current: ${currentValue})`, currentValue);
        if (newValue !== null) {
            newValue = parseInt(newValue, 10);
            if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
                GM_setValue(`setting${settingNum}`, newValue);
                updateMenu(); // Refresh menu with new values
            } else {
                alert("Invalid input! Please enter a number between 1 and 10.");
            }
        }
    }

    updateMenu(); // Initialize menu
})();
