// ==UserScript==
// @name         Settings Menu System
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Configurable settings menu with persistent storage
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    
    // Store menu command IDs for later unregistering
    let menuCommandIds = [];
    
    // Initialize settings if they don't exist
    const initializeSettings = () => {
        for (let i = 1; i <= 5; i++) {
            if (GM_getValue(`setting${i}`) === undefined) {
                GM_setValue(`setting${i}`, i);
            }
        }
    };
    
    // Create a prompt for a setting
    const promptSetting = (settingNum) => {
        const currentValue = GM_getValue(`setting${settingNum}`);
        const newValue = prompt(
            `Setting ${settingNum}: (acceptable 1 - 10) (current: ${currentValue})`,
            currentValue
        );
        
        if (newValue !== null) {
            const parsed = parseInt(newValue);
            if (!isNaN(parsed) && parsed >= 1 && parsed <= 10) {
                GM_setValue(`setting${settingNum}`, parsed);
                updateMenuCommands();
            } else {
                alert('Please enter a number between 1 and 10');
            }
        }
    };
    
    // Update all menu commands
    const updateMenuCommands = () => {
        // Unregister old commands
        menuCommandIds.forEach(id => GM_unregisterMenuCommand(id));
        menuCommandIds = [];
        
        // Register new commands
        for (let i = 1; i <= 5; i++) {
            const currentValue = GM_getValue(`setting${i}`);
            const id = GM_registerMenuCommand(
                `Setting ${i}: ${currentValue}`,
                () => promptSetting(i)
            );
            menuCommandIds.push(id);
        }
    };
    
    // Initialize and create first menu
    initializeSettings();
    updateMenuCommands();
})();
