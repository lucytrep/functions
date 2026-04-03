// coding tutor helped me go through and update the country to font option
// removing the search function and input to only options for my font styling sheets

const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
// removed input field cause no search
options = wrapper.querySelector(".options");

// changed countries to fonts
let fonts = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana"];

function addFont(selectedFont) {
    options.innerHTML = "";
    fonts.forEach(font => {
        let isSelected = font == selectedFont ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${font}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addFont();
function updateName(selectedLi) {
    // removed input
    // searchInp.value = "";
    addFont(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

//  removed search input
selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));