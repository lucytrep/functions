// https://www.codingnepalweb.com/custom-select-menu-html-javascript/
// coding tutor helped me go through and update the country to font option
// removing the search function and input to only options for my font styling sheets

const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
// removed input field cause no search
options = wrapper.querySelector(".options");

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
    "Sans-serif": "Clean and open. Easier to scan for people with reading differences like dyslexia.",
    "Serif": "Traditional and grounded. Helps with focus on long reads and editorial content.",
    "Mono": "Spaced and structured. Useful for processing dense or technical information."
};

// continuation of tutorial https://www.codingnepalweb.com/custom-select-menu-html-javascript/
addFont();
function updateName(selectedLi) {
    // removed input
    // searchInp.value = "";
    addFont(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
    // coding tutor - passes chosen font name to applyFont to inject CSS into the active tab
    // same as scripts into active tab from tutorial https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab
    // updates the description paragraph in the HTML when a font is selected
    document.getElementById("font-description").textContent = fontDescriptions[selectedLi.innerText] || "";
    applyFont(selectedLi.innerText);
}

// tracking the active font outside the function mentioned from Claude when I was tryign to tackle the bottom half of this function below. 
// https://claude.ai/chat/a7bf4aa3-3f50-4daf-9810-dbfe15cd44e9
let activeFontCSS = null;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
// coding tutor showed me applyfont function this is the fonts being applied within the drop down
// maps each font name to its css file within the folder font-family when selected
// more research https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
async function applyFont(font) {
    const cssFont = {
        "Sans-serif": "font-family/sans-serif.css",
        // "Georgia": "font-family/georgia.css",
        "Serif": "font-family/serif.css",
        "Mono": "font-family/mono.css",
        // "Verdana": "font-family/verdana.css"
    }

    // needed to find active tab to inject CSS into - not in chrome extension tutorial
    // tried this first from chrome tabs docs
    // https://developer.chrome.com/docs/extensions/reference/api/tabs
    // function getCurrentTab(callback) {
    //     let queryOptions = { active: true, lastFocusedWindow: true };
    //     chrome.tabs.query(queryOptions, ([tab]) => {
    //     if (chrome.runtime.lastError)
    //     console.error(chrome.runtime.lastError);
    //     // `tab` will either be a `tabs.Tab` instance or `undefined`.
    //     callback(tab);
    //     });
    // }
    
    // also tried getTabId from scripting tutorial
    // // if (nextState === "ON") {
    // // Insert the CSS file when the user turns the extension on
    // await chrome.scripting.insertCSS({
    //     files: ["focus-mode.css"],
    //     target: { tabId: tab.id },
    // });
    // searched - how to get current tab id in chrome extension popup https://www.google.com/search?q=how+to+get+current+tab+id+in+chrome+extension+popup%3F%3F&sca_esv=e701aa2a750b70d5&rlz=1C5CHFA_enCA864CA864&sxsrf=ANbL-n597d2QZdLDdVjtyFq48i12XtI7Yw%3A1775248699455&ei=OyXQabzDG4PcptQPzqaU-A0&biw=841&bih=989&ved=0ahUKEwj8zPngxNKTAxUDrokEHU4TBd8Q4dUDCBE&uact=5&oq=how+to+get+current+tab+id+in+chrome+extension+popup%3F%3F&gs_lp=Egxnd3Mtd2l6LXNlcnAiNWhvdyB0byBnZXQgY3VycmVudCB0YWIgaWQgaW4gY2hyb21lIGV4dGVuc2lvbiBwb3B1cD8_MgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigATIFECEYqwIyBRAhGKsCMgUQIRirAjIFECEYnwUyBRAhGJ8FSJAJUMAFWJoHcAF4AZABAJgBcaAB1wGqAQMwLjK4AQPIAQD4AQGYAgOgAuQBwgIKEAAYsAMY1gQYR5gDAIgGAZAGCJIHAzEuMqAH2hWyBwMwLjK4B-IBwgcDMC4zyAcHgAgA&sclient=gws-wiz-serp
    // simplified to this
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query



// const extensions = 'https://developer.chrome.com/docs/extensions';
// const webstore = 'https://developer.chrome.com/docs/webstore';

// chrome.action.onClicked.addListener(async (tab) => {
//   if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
//     // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     // Next state will always be the opposite
//     const nextState = prevState === 'ON' ? 'OFF' : 'ON';

//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });
//   }
// });

// from chrome tabs docs - getting the active tab
// https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query
// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }

// message to the selected page to eventutually change fonts
// https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query
// function sendMessageToActiveTab(message) {
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//   const response = await chrome.tabs.sendMessage(tab.id, message);
//   // TODO: Do something with the response.
// }

// chrome.action.onClicked.addListener(async (tab) => {
//   if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
//     // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     // Next state will always be the opposite
//     const nextState = prevState === 'ON' ? 'OFF' : 'ON';

//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });
//   }
// });

// adapted to get tabId and inject CSS directly
    // chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    //     const tabId = tabs[0].id;
    //     // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
    //     // changed to cssFont
    //     await chrome.scripting.removeCSS({ target: { tabId }, files: Object.values(cssFont) });
    //     // adapted from focus-mode tutorial: https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab
    //     // changed to font not map
    //     chrome.scripting.insertCSS({ target: { tabId }, files: [cssFont[font]] });
    // });

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

//  removed search input
selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

    // if (activeFontCSS) {
    //     await chrome.scripting.removeCSS({
    //     target: { tabId: tab.id },
    //     files: [activeFontCSS]
    //     });
    // }

    // Clear storage
    // chrome.storage.sync.clear(() => {
    //     console.log('All storage cleared');
    //     // Optional: Reload extension or notify user
    //     chrome.runtime.reload(); 
    // });


// chrome.scripting.removeCSS({
//   target: { tabId: tab.id  },
//     // target: { tabId: someTabId },
//   files: ['popup.css']
// });


// searched in google how to remove injected CSS from a chrome extension top search and a couple articles recommended a function which I have manipulated below to follow my style sheets
// async needed because function uses await - without it the await calls will not work shown earlier in my work
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    document.getElementById('resetBtn').addEventListener('click', async () => {
        // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
        // if a font is active
        if (activeFontCSS) {
            // within this chrome page
            // https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query
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
            activeFontCSS = null;
        }
        // from previous function and continuation of tutorial https://www.codingnepalweb.com/custom-select-menu-html-javascript/
        // selectBtn.firstElementChild.innerText = selectedLi.innerText;
        // resets label back to default no injected CSS just <label>Select Font</label> from html
        selectBtn.firstElementChild.innerText = "Select Font";
        // when button is pressed this is just making sure no description shows when I type in ""
        document.getElementById("font-description").textContent = "";
        // re render with no selection from previous function in tutorial
        addFont();
    });


// // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
//     // if a font is active the previous will be removed so not stacking ontop of one another
//     if (activeFontCSS) {
//         await chrome.scripting.removeCSS({
//         target: { tabId: tab.id },
//         files: [activeFontCSS]
//         });
//     }

    // // adapted to get tabId and inject CSS directly
    // chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    //     const tabId = tabs[0].id;
    //     // https://developer.chrome.com/docs/extensions/reference/api/scripting#method-removeCSS
    //     // changed to cssFont
    //     await chrome.scripting.removeCSS({ target: { tabId }, files: Object.values(cssFont) });
    //     // adapted from focus-mode tutorial: https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab
    //     // changed to font not map
    //     chrome.scripting.insertCSS({ target: { tabId }, files: [cssFont[font]] });
    // });

