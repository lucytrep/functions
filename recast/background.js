// expose applyBackground so other popup scripts can reuse the same background logic
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// https://chatgpt.com/share/69dfc366-0530-8330-a8ed-391d485cbaf3
// window function mentioned in my other Chat
window.applyBackground = applyBackground

// same pattern as applyFont in script.js
// applies colors to css files and removes previous
let activeBackgroundCSS = null;

// adapted from chrome.storage.local.get in tutorial
// https://developer.chrome.com/docs/extensions/reference/api/storage
chrome.storage.local.get("activeBackgroundCSS", (result) => {
   if (result.activeBackgroundCSS) {
        activeBackgroundCSS = result.activeBackgroundCSS;
    }
});

async function applyBackground(color) {
    const cssBackground = {
        "#FAF9F6": "background/light.css",
        "#2c2c2c": "background/dark.css",
        "#F5F0E8": "background/paper.css",
        }

        const cssFile = cssBackground[color];
        if (!cssFile) {
            console.error("Background not found:", color);
            return;
        }

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    if (activeBackgroundCSS) {
        await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [activeBackgroundCSS]
        });
    }
  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: [cssFile]
  });

  activeBackgroundCSS = cssFile;

//   activeBackgroundCSS = cssFile;
// adapted from updateTip in tutorial which saves from local storage
chrome.storage.local.set({ activeBackgroundCSS: cssFile });

}

// background color is applied one at a time, the html swatches loop and each has its own listener so nothing fires at the same time
// i also needed to be able to save the presets so the swatch could be read/remembered when clicked on
// https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// forEach gives each swatch its own listener and classList.remove clears active from all before adding it to just the clicked one
document.querySelectorAll("#bg-swatches .swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    document.querySelectorAll("#bg-swatches .swatch").forEach(s => s.classList.remove("active"))
    swatch.classList.add("active")
    applyBackground(swatch.dataset.color)
  })
})

// same as in other file, changed to background not font
document.getElementById('resetBtn').addEventListener('click', async () => {
        // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
        // if a background is active
        if (activeBackgroundCSS) {
            // within this chrome page
            // https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query
            // find the active tab same as applyBackground above
            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
            // remove when the user presses reset
            await chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: [activeBackgroundCSS]
            });
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null
            // reset activeBackgroundCSS to null so extension removes active background
            activeBackgroundCSS = null;

        // clearing the background from storage when reset is pressed so it does not come back
        // https://developer.chrome.com/docs/extensions/reference/api/storage
        chrome.storage.local.remove("activeBackgroundCSS");
        }
});

