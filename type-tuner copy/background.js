// // Copyright 2023 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     https://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.



// changeColorButton.addEventListener('click', (event) => {
//   const color = event.target.value;

//   // Query the active tab before injecting the content script
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     // Use the Scripting API to execute a script
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       args: [color],
//       func: setColor
//     });
//   });
// });



// // Copyright 2023 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     https://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.

// const buttonDiv = document.getElementById('buttonDiv');
// const buttonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

// const createColorButtons = (buttonColors) => {
//   buttonColors.forEach((color) => {
//     const button = document.createElement('button');
//     button.style.backgroundColor = color;

//     button.addEventListener('click', () => {
//       chrome.storage.sync.set({ color }, () => {
//         console.log(`color is ${color}`);
//       });
//     });

//     buttonDiv.appendChild(button);
//   });
// };

// createColorButtons(buttonColors);

// document.querySelectorAll(".swatch").forEach(swatch => {
//     swatch.addEventListener("click", async () => {
//     // changeColorButton.addEventListener('click', (event) => {
//     //   const color = event.target.value;
//     const color = swatch.dataset.color;

//     // Query the active tab before injecting the content script
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         // Use the Scripting API to execute a script
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             args: [color],
//             func: setColor
//             });
//         });
//     });
// });

// function setColor(color) {
//   // There's a typo in the line below;
//   // ❌ colors should be ✅ color.
//   document.body.style.backgroundColor = color;
// }

// same pattern as applyFont in script.js
// applies colors to css files and removes previous
let activeBackgroundCSS = null;

async function applyBackground(color) {
    const cssBackground = {
        "#FFF8F0": "background/warm.css",
        "#F0F4FF": "background/cool.css",
        "#2c2c2c": "background/dark.css",
        "#F5F0E8": "background/paper.css",
        // "Sans-serif": "font-family/sans-serif.css",
        // // "Georgia": "font-family/georgia.css",
        // "Serif": "font-family/serif.css",
        // "Mono": "font-family/mono.css",
        // // "Verdana": "font-family/verdana.css"
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
}

// // addEventListener pattern from arena file closeButton.addEventListener('click', () => {
// // from tutorial function updateName let li = `<li onclick="updateName(this)"...`
// // moved out of onclick="" string into addEventListener because chrome blocks inline handlers from coding tutor
// // https://developer.chrome.com/docs/extensions/develop/migrate/improve-security#remove-inline-scripts
// // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// li.addEventListener('click', () => updateName(li));

// allowing static html swatches to loop and be applied individually 
// nothing is applied at the same time
// js is looking for event listeners to apply the color to the background unlike the list items for font-family
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
document.querySelectorAll(".swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
        applyBackground(swatch.dataset.color);
    });
});

// function addFont(selectedFont) {
//     options.innerHTML = "";
//     fonts.forEach(font => {
//         // ternary operator - same pattern used in arena file for category
//         // let category = isMaterial ? 'materials' : isHouse ? 'houses' : isInspiration ? 'inspirations' : isResource ? 'resources' : isDetail ? 'details' : isFinish ? 'finishes' : 'resources'
//         // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
//         let isSelected = font == selectedFont ? "selected" : "";