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
// basically get some data, loop through it, create elements, put them on the page
let renderPresets = () => {
  let list = document.querySelector("#preset-list")
  // Clear the list before rebuilding it so presets do not repeat
  list.innerHTML = ""
  // localStorage stores text, so JSON.parse turns the saved presets back into an array
  let presets = JSON.parse(localStorage.getItem("presets") || "[]")

  // same forEach pattern as fonts.forEach in script.js and json.data.forEach in arena file
    presets.forEach((preset, index) => {
    let li = document.createElement("li")
    li.textContent = preset.name

    // I originally had the delete button outside this function, but `list` was not defined there
    // this needs to stay inside renderPresets() so it can access `list`
    // same createElement pattern as addFont in script.js
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"

    // same addEventListener pattern from script.js
    // coding tutor flagged that chrome extensions block inline onclick handlers so addEventListener is required
    // Get the latest saved presets, remove the clicked one, then save and re-render the list.
    deleteBtn.addEventListener("click", () => {
      let presets = JSON.parse(localStorage.getItem("presets") || "[]")
      // splice removes one item at the index position
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      // remove the clicked preset then save the updated array and finally rebuild the list
      presets.splice(index, 1)
      // saving updated array back same localStorage.setItem as storeParams in tutorial
      localStorage.setItem("presets", JSON.stringify(presets))
      renderPresets()
    })

    // appending button inside li first then li into the list
    // console showed li.innerHTML was empty when order was wrong
    li.appendChild(deleteBtn)
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

// presets.forEach((preset, index) => {
//   // same createElement pattern as addFont in script.js
//   let li = document.createElement("li")
//   li.textContent = preset.name

//   // creating a delete button for each preset - same createElement pattern
//   let deleteBtn = document.createElement("button")
//   deleteBtn.textContent = "Delete"

//   // same addEventListener pattern from script.js and arena file
//   deleteBtn.addEventListener("click", () => {
//     // splice removes one item at the index position from the array
//     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
//     presets.splice(index, 1)
//     // saving the updated array back - same localStorage.setItem as storeParams in tutorial
//     localStorage.setItem("presets", JSON.stringify(presets))
//     // rebuild the list after deleting
    renderPresets()
//   })

//   // appending delete button inside the li then adding li to the list
//   li.appendChild(deleteBtn)
//   list.appendChild(li)
// })