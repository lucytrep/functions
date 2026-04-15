
// Target your form.
let formElement = document.querySelector('.preset-form')
// redefining variable so I dont need all files in one
// let selectBtn = document.querySelector('.select-btn')


// // Function to save them to `localStorage`.
// let storeParams = () => {
// 	// Get the form data:
// 	// https://developer.mozilla.org/en-US/docs/Web/API/FormData
// 	let formParams = new FormData(formElement)

// 	// Loop through each key/value pair.
// 	formParams.forEach((value, key) => {
// 		// And save them out to the browser:
// 		// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// 		localStorage.setItem(key, value)

    
// 	})
// }

// // Watch for events!
// formElement.addEventListener('submit', (event) => {
// 	// Don’t actually submit (which would refresh the page):
// 	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
// 	event.preventDefault()
// })

// // // Run any time the form is modified:
// // // https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
// // formElement.addEventListener('input', () => {
// // 	updateUrlParams()
// // })


// I wanted the saved presets to show up as a list every time the user saves one and when they first open the extension
// The Claude thread helped me understand that localStorage only stores strings not arrays so I needed JSON.parse to convert it back
// https://claude.ai/share/8041d88f-3be1-4d86-96db-65a10a97d8a7
// I learned that localStorage stores everything as strings so JSON.parse is needed to turn it back into an array I can loop over
// same createElement and insertAdjacentElement pattern as addFont in script.js but just reading from localStorage instead of a fonts array
let renderPresets = () => {
  let list = document.querySelector("#preset-list")
  // clearing the list before rebuilding it which is the same as options.innerHTML = "" in addFont
  list.innerHTML = ""
  // reading from localStorage and converting the string back to an array so I can loop over it
  let presets = JSON.parse(localStorage.getItem("presets") || "[]")
  // same forEach pattern as fonts.forEach in script.js and json.data.forEach in arena file
  presets.forEach((preset) => {
    let li = document.createElement("li")
    li.textContent = preset.name
    list.appendChild(li)
  })
}

// I wanted to package the font and background the user has active together with the name they typed and save it
// The problem was activeBackgroundCSS and selectBtn live in other files so I couldnt access them directly
// The Claude thread suggested reading from the DOM instead since the DOM is shared across all files
// https://claude.ai/share/8041d88f-3be1-4d86-96db-65a10a97d8a7
let savePreset = () => {
  let presetName = new FormData(formElement).get("preset")
  if (!presetName) return
  let newPreset = {
    name: presetName,
    background: document.body.style.backgroundColor,
    fontFamily: document.querySelector('.select-btn label').innerText
  }
  let presets = JSON.parse(localStorage.getItem("presets") || "[]")
  presets.push(newPreset)
  localStorage.setItem("presets", JSON.stringify(presets))
  renderPresets()
}

// I wanted the input field to clear after the user saves a preset so they can type a new one
// Watch for events adapted from forms-params-storage tutorial
// https://github.com/typography-interaction-2526/forms-params-storage
// Watch for events!
formElement.addEventListener("submit", (event) => {
    // Don’t actually submit (which would refresh the page):
	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault()
    // call my save function when form submits
    savePreset()
    // clear the input after saving - from MDN
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
    formElement.reset()
})