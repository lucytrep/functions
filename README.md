<img width="318" height="87" alt="Thumbnail" src="https://github.com/user-attachments/assets/178f8003-ff7f-4853-b3f9-51a3052c03db" />
<h1>Recast</h1>

This is a Chrome Extension I developed as my final project for Typography and Interaction. With this you can customize how you read on the web by switching fonts, changing backgrounds, and saving your favorite combos as presets, all without leaving the page.
If a site doesn't offer dark mode or the typography feels off, this  lets you fix it instantly. 

<h4>Preview of Extension</h4>

<img width="178" height="269" alt="Screenshot 2026-04-22 at 1 27 09 PM" src="https://github.com/user-attachments/assets/bce04953-359a-4bbc-b751-17e6ea80c394" />

<h4>Before</h4>
<img width="250" height="240" alt="Screenshot 2026-04-22 at 1 19 13 PM" src="https://github.com/user-attachments/assets/fb8e4ad3-68b9-408b-a536-955afe5050d2" />
<h4>After </h4>
<img width="250" height="240" alt="Screenshot 2026-04-22 at 1 19 26 PM" src="https://github.com/user-attachments/assets/2e457056-68e2-47f3-a0a0-bdb84f3afb30" />

<h3>Product Features</h3>

- 3 font family options: Sans Serif, Serif, and Monospace
- 3 background options: Light, Dark, and Paper
- Descriptions on why certain fonts or colors are a nice to have
- Instant page updates, no refresh needed
- Preset saving so you can reuse your favorite combinations and label them however you wish
- Reset to restore the page to its original styles

<h3>Installation</h3>

1. Start by downloading or cloning this repository
2. Head over to Chrome and go to `chrome://extensions`
3. Toggle the **Developer Mode** on in the top right corner
4. Click **Load unpacked**
5. Select the Recast project folder on your computer
6. The extension will appear in your toolbar, make sure to pin it for easy access
  
<h3>How to use</h3>

1. Open any webpage in Chrome
2. Click the Recast icon in your Chrome toolbar
3. Pick a font and a background and the page updates instantly
5. Type a name in the Presets field and hit Save to keep your combo
6. Click any saved preset to reapply it
7. Hit Clear to restore the page back to its original styles

<h3>Fonts</h3>

| Option | Description |
| :------------------ | :------------------ |
| Sans Serif | Clean, modern and good for most reading |
| Serif | Traditional and easier for long-form content |
| Monospace | Fixed-width and great for technical and heavy content |

<h3>Backgrounds</h3>

| Option | Description |
| :------------------ | :------------------ |
| Light | #FAF9F6 Bright and good for daytime reading|
| Dark | #2C2C2C Darker and reduces eye strain |
| Paper | #F5F0E8 Warm and less harsh than pure white |

<h3>Presets</h3>

Presets let you save font + background combinations and reapply them in one click.

- Type a name in the Preset name field and click Save
- Your saved presets appear below the input
- Click any preset to instantly apply that combination to the page
- Click Remove to delete a preset from your list

<h3>Built With</h3>

- Vanilla JavaScript
- Chrome Extensions API
- CSS injection via content scripts

<h3>Technical Details</h3>

These are some of the functions and tools I used and want to remember:

<h4>JavaScript</h4>

- `chrome.scripting.insertCSS` sends a CSS file into the webpage the user is currently on
- `chrome.scripting.removeCSS` removes the old CSS before adding a new one so styles don't pile up on top of each other
- `chrome.tabs.query` figures out which tab is open so the styles go to the right place
- `chrome.storage.local` remembers what font and background were active even after the popup closes
- `localStorage` saves the user's presets so they don't disappear when the extension is closed
- `JSON.parse` and `JSON.stringify` converts saved presets into text for storage and back into usable data when needed
- `window.applyFont` and `window.applyBackground` makes these functions available across all three script files since they're loaded separately
- `querySelectorAll` plus `forEach` gives each font and background tile its own click listener
- `document.createElement` builds each preset row and delete button on the fly when a preset is saved
- `window.close` closes the popup when the X on the welcome banner is clicked
- `DOMContentLoaded` makes sure the page is fully loaded before the close button starts listening for clicks

<h4>HTML</h4>

- `<form>` and `<input type="text">` for the preset name field and save button
- `data-font` and `data-color` attributes on each tile so JavaScript can read what was selected
- `<ul>` and `<li>` elements that get created dynamically each time a preset is saved
- Three separate `<script>` tags to load `script.js`, `background.js`, and `presets.js`

<h4>CSS</h4>

- Flexbox to lay out the font and background tiles in a row
- CSS variables for consistent colors across the UI
- Injected stylesheets override the existing page fonts and backgrounds without touching the site's original code
- `color: inherit` on the preset delete button so it automatically matches the text color of its parent list item, whether light or dark
- `:empty` pseudo-class on the font and background description paragraphs so they hide completely when no option is selected instead of leaving blank space
- `rgba` with low opacity for the preset delete button background so it works on both light and dark preset rows without needing separate styles
