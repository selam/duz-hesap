// Define the tags or elements to search for
const tagsToReplace = ["div.priceContainer div > span > ins", "div.prc-box-dscntd"]; // Add any tags you want to target
const pricePattern = /\b(\d+),(\d{2})\b/g;
const storageAPI = typeof chrome !== 'undefined' && chrome.storage ? chrome.storage : browser.storage;
storageAPI.local.get("roundUp", (data) => {
    const roundUp = data && data.roundUp || false;
    // Iterate over each type of tag
    const processPrices = () => {
        tagsToReplace.forEach(tag => {
                // Get all elements of this type
            const elements = document.querySelectorAll(tag);

            elements.forEach(element => {
                if (pricePattern.test(element.textContent)) {
                    const price = element.textContent.replace(pricePattern, (match, wholePart, decimalPart) => {
                        let prc =  Math.ceil(Number(wholePart + '.' + decimalPart));
                        // Check if rounding is enabled and the price ends with 4 or 9
                        if (roundUp && (prc % 10 === 4 || prc % 10 === 9)) {
                            prc += 1;
                        }
                        return prc;
                    });
                
                
                    element.textContent = price
                }

            });
            
        });
    }

    processPrices();
    // Listen for changes to the DOM and reprocess prices
    const observer = new MutationObserver(processPrices);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});



 