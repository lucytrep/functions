// expose applyFont so other popup scripts can reuse the same font logic
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// https://chatgpt.com/share/69dfc366-0530-8330-a8ed-391d485cbaf3
// I learned that attaching a function to window makes it globally accessible across scripts, I have my pages separate for organization and to better understand the functions for my own learning but with this I have to use functions like this so the file can reach around and grab the functions applied to the other js pages
window.applyFont = applyFont

// https://chatgpt.com/share/69dfc366-0530-8330-a8ed-391d485cbaf3
// I wanted the page to react when a saved preset was clicked in the popup
// more research here too "Chrome Extensions runtime.onMessage" https://developer.chrome.com/docs/extensions/reference/api/runtime#event-onMessage
// I learned that onMessage can receive the preset object from the popup and use it to update the page DOM
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "APPLY_PRESET") {
    console.log("received preset:", message.preset)
    document.body.style.backgroundColor = message.preset.background
    document.body.style.fontFamily = message.preset.fontFamily
  }
})

// changed countries to fonts
let fonts = ["Sans-serif", "Serif", "Mono"];

function addFont(selectedFont) {
    options.innerHTML = "";
    fonts.forEach(font => {
        // ternary operator - same pattern used in arena file for category
        // let category = isMaterial ? 'materials' : isHouse ? 'houses' : isInspiration ? 'inspirations' : isResource ? 'resources' : isDetail ? 'details' : isFinish ? 'finishes' : 'resources'
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
        let isSelected = font == selectedFont ? "selected" : "";

        // tutorial
        // let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        // options.insertAdjacentHTML("beforeend", li);
        // updated
        // let li = `<li class="${isSelected}" onclick="updateName(this)">${font}</li>`;
        // options.insertAdjacentHTML("beforeend", li);
        // tutor flagged that chrome extensions block onclick 
        // https://developer.chrome.com/docs/extensions/develop/migrate/improve-security#remove-inline-scripts
        // further research https://www.google.com/search?q=onclick+blocked+by+chrome+extension%3F%3F&rlz=1C5CHFA_enCA864CA864&oq=onclick+blocked+by+chrome+extension%3F%3F&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAjIHCAIQIRiPAtIBCDU4ODNqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8
        // from arena script file testing
        // let textContent = block.querySelector('li')?.innerHTML
        // let li = document.getElementById('li')
        // document.getElementById('modal-link').href = `<li class="${isSelected}" onclick="updateName(this)">${font}</li>`
        // coding tutor help cannot do string have to do createElement
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        let li = document.createElement("li");

        // applies that result as the class attribute on the <li>
        // same as writing <li class="selected"> or <li class=""> in HTML
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/className
        li.className = isSelected;
        
	    // channelTitle.innerHTML = channelData.title
        // sets the visible text inside the <li> to the font name
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
        // li.innerText = font;
        // same as arena file document.getElementById('modal-type').textContent = description
        // sets visible text inside the <li> to the font name
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        li.textContent = font;

        // i wanted each font option in the dropdown to preview itself so the user can see what it looks like before selecting
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
        // MDN shows that CSS properties with dashes like font-family are written in camelCase in JS
        // li.style gives me access to the inline styles on the element so I can set fontFamily directly without touching the CSS file
        // element.style.backgroundColor = "red"
        li.style.fontFamily = font;

        // addEventListener pattern from arena file closeButton.addEventListener('click', () => {
        // from tutorial function updateName let li = `<li onclick="updateName(this)"...`
        // moved out of onclick="" string into addEventListener because chrome blocks inline handlers from coding tutor
        // https://developer.chrome.com/docs/extensions/develop/migrate/improve-security#remove-inline-scripts
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        li.addEventListener('click', () => updateName(li));


        // coding tutor mention same idea as arena file: channelBlocks.insertAdjacentHTML('beforeend', linkItem)
        // using insertAdjacentElement instead because li is an element not a string
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
        options.insertAdjacentElement('beforeend', li);
    });
}

// declaring the variable we learned in class
const fontDescriptions = {
    "Sans-serif": "Clean and open. Can help with readability.",
    "Serif": "Traditional feel. Good for editorial content.",
    "Mono": "Fixed spacing. Helpful for dense text."
};

// tracking the active font outside the function mentioned from Claude when I was tryign to tackle the bottom half of this function below. 
// https://claude.ai/chat/a7bf4aa3-3f50-4daf-9810-dbfe15cd44e9
let activeFontCSS = null;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
// coding tutor showed me applyfont function this is the fonts being applied within the drop down
// maps each font name to its css file within the folder font-family when selected
// learned that object initializer syntax lets me pair each font name with its file path so I can look it up by key
async function applyFont(font) {
    const cssFont = {
        "Sans-serif": "font-family/sans-serif.css",
        // "Georgia": "font-family/georgia.css",
        "Serif": "font-family/serif.css",
        "Mono": "font-family/mono.css",
        // "Verdana": "font-family/verdana.css"
    }

    // coding tutor helped me and then back to claude
    // I am trying to code a chrome extension that changes the fonts on a webpage by applying style sheets with different fonts. How can I use these examples from tutorials I found online "
    // https://claude.ai/share/8ec75992-5d4a-49c4-84df-0fee1f466d01
    // trying to apply the fonts form the style sheets to the DOM individually and making sure it doesnt crash or look messy. Starting with the active li and applying the css to the DOM. Making sure font is not stacking ontop of one another tutor and Claude mentioned to me during session. 

  // find the css file for the font that was clicked
  const cssFile = cssFont[font];
  if (!cssFile) {
    console.error("Font not found:", font);
    return;
  }

  // Get the active tab (from the tutorial)
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

// https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
    // if a font is active the previous will be removed so not stacking ontop of one another
    if (activeFontCSS) {
        await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [activeFontCSS]
        });
    }

  // apply the new font to the page
  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: [cssFile]
  });

  // system can remember what font is active
  activeFontCSS = cssFile;
}


// searched in google how to remove injected CSS from a chrome extension top search and a couple articles recommended a function which I have manipulated below to follow my style sheets
// async needed because function uses await - without it the await calls will not work shown earlier in my work
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    document.getElementById('resetBtn').addEventListener('click', async () => {
        // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
        // if a font is active
        if (activeFontCSS) {
            // within this chrome page
            // https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query
            // learned that chrome.tabs.query with active and lastFocusedWindow gives me the current tab to pass into scripting
            // find the active tab same as applyFont above
            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
            // remove when the user presses reset
            await chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: [activeFontCSS]
            });
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null
            // reset activeFontCSS to null so extension removes active font
            // setting the variable back to null clears the reference so the next font can apply cleanly
            activeFontCSS = null;
        }
        // from previous function and continuation of tutorial https://www.codingnepalweb.com/custom-select-menu-html-javascript/
        // selectBtn.firstElementChild.innerText = selectedLi.innerText;
        // resets label back to default no injected CSS just <label>Select Font</label> from html
        // selectBtn.firstElementChild.innerText = "Select font-family";
        // when button is pressed this is just making sure no description shows when I type in ""
        document.getElementById("font-description").textContent = "";
        // re render with no selection from previous function in tutorial
        // addFont();
    });

// updated
document.querySelectorAll(".font-section .font-card").forEach(font => {
  font.addEventListener("click", () => {
    document.querySelectorAll(".font-section .font-card").forEach(s => s.classList.remove("active"))
    font.classList.add("active")
    // update description when font card is clicked
    // old
    // document.getElementById("font-description").textContent = fontDescriptions[selectedLi.innerText] || "";
    document.getElementById("font-description").textContent = fontDescriptions[font.dataset.font] || ""
    applyFont(font.dataset.font)
  })
})