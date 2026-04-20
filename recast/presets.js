// Target your form.
let formElement = document.querySelector('.preset-form')
// redefining variable so I dont need all files in one
// let selectBtn = document.querySelector('.select-btn')

// https://chatgpt.com/share/69dfc366-0530-8330-a8ed-391d485cbaf3
// I was trying to get clicked presets to reapply their saved font and background back to the page
// the problem was document.body inside the popup points to the popup itself not the active tab so styles were not reaching the webpage
// from thread the apply logic needs to go through the shared window function later on including on window.applyFont and window.applyBackground in the li click listener
let applyPreset = (preset) => {
  console.log("applying preset:", preset)

//   document.body.style.backgroundColor = preset.background

  let content = document.querySelector("article")
  if (content) {
    // content.style.fontFamily = preset.fontFamily
  }

  // Update the dropdown label so the UI matches the preset that was applied
  let fontLabel = document.querySelector(".select-btn label")
  if (fontLabel) {
    fontLabel.innerText = preset.fontFamily
  }
}

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
    // was dubplicating if I had the below
    // li.textContent = preset.name

// create a separate element for the preset name so it can be styled and clicked independently, and does not effect the rest of the row
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// I learned that createElement("span") lets me create a separate element for the preset name inside the list item
let presetName = document.createElement("span")
presetName.textContent = preset.name

// make it visually clickable
// https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor
// I learned that cursor: pointer shows the clickable hand cursor instead of the text cursor
presetName.style.cursor = "pointer"


// when a saved preset is clicked, reuse the existing font and background functions
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// so the preset applies to the active webpage again
// I learned that the preset row can listen for a click event and call the shared font and background functions again through window
li.addEventListener("click", () => {
  window.applyFont?.(preset.fontFamily)
  window.applyBackground?.(preset.background)
})

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

// played around and learned how to build and insert elements into the DOM using appendChild which allows each preset to be added dynamically to the list
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
li.appendChild(presetName)
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

  let selectedSwatch = document.querySelector(".swatch.active")
  if (!selectedSwatch) return

  let newPreset = {
    name: presetName,
    background: selectedSwatch.dataset.color,
    fontFamily: document.querySelector(".select-btn label").innerText
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
