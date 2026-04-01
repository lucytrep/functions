// Content script for Hello World Extension

(function() {
    // Check if the popup already exists
    if (document.getElementById('hello-world-extension-popup')) {
        return;
    }

    // Layout containing styles and HTML template for the popup
    const layout = {
        styles: `
            .hello-world-popup {
                position: fixed;
                top: 10px;
                right: 20px;
                background-color: #ffffff;
                color: #333333;
                padding: 15px 25px;
                border-radius: 20px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                font-family: Arial, sans-serif;
                font-size: 16px;
                text-align: center;
                transition: opacity 0.3s ease-in-out;
            }

            body {
  width: 20rem;
  padding-inline: 10px;
  padding-block-end: 20px;
  /* width: 300px; */
    border-radius: 12px;
  overflow: hidden;
}

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */

h1 {
  font-family: 'Arial', sans-serif;
  color: #000;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.9px;
}

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */

h2 {
  color: #000;
  font-family: 'Arial', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.39px;
}

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */

h3 {
  color: #7F7F7F;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.27px;
  padding-block-start: 10px;
}

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */
/* 
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
} */

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */

.font {
  height: 32px;
    /* background: #f0f0f0; */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-inline-start: 8px;
    /* padding: 8px; */
  display: flex;
  align-items: center;
}

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */


.font-details-row {
  display: flex;
  gap: 10px;
  /* width: 100% */
}

.font-details {
  flex: 1;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-inline-start: 8px;
  display: flex;
  align-items: center;
  margin-block-start: 10px;
}

.font-details-col {
  flex: 1;
}

/* pasted from Figma prototype, will change to relative units down the line
https://www.figma.com/design/0U98ZUQkZn9AKklQUUK5xy/Lucy-Trepanier?node-id=302-252&m=dev */

p {
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.39px;
}
        `,

        template: `
            <div class="hello-world-popup" id="hello-world-extension-popup">
                <h2>Hello World!</h2>
                <p>This popup was created by the Chrome extension</p>
                <button id="close-popup">Close</button>
            </div>
        `
    };

    // Add styles to the document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = layout.styles;
    document.head.appendChild(styleSheet);

    // Add the popup HTML to the page
    document.body.insertAdjacentHTML('beforeend', layout.template); // Fixed: Changed htmlTemplate to layout.template

    // Add event listener to close button
    document.getElementById('close-popup').addEventListener('click', function() {
        const popup = document.getElementById('hello-world-extension-popup');
        popup.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(popup);
            document.head.removeChild(styleSheet);
        }, 300);
    });
})();