const saveButton = document.getElementById("save");
const storageAPI = typeof chrome !== 'undefined' && chrome.storage ? chrome.storage : browser.storage;
const statusElem = document.getElementById("status");
// Load existing settings
storageAPI.local.get("roundUp", (data) => {
    roundUpCheckbox.checked = data.roundUp || false;
});

// Save settings
saveButton.addEventListener("click", () => {
    const roundUpCheckbox = document.getElementById("roundUpCheckbox");
    storageAPI.local.set({ roundUp: roundUpCheckbox.checked }, () => {
        statusElem.textContent = "Ayarlar kaydedildi";
        setTimeout(() => {
            statusElem.textContent = "";
        }, 2000);    
    });
});