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
                transition: opacity 0.3s ease-in-out;
            }

            body {
                width: 20rem;
                padding-inline: 10px;
                padding-block-end: 20px;
                border-radius: 12px;
                overflow: hidden;
            }

            h1 {
                font-family: 'Arial', sans-serif;
                color: #000;
                font-size: 30px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                letter-spacing: -0.9px;
            }

            h2 {
                color: #000;
                font-family: 'Arial', sans-serif;
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: -0.39px;
            }

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

            .font {
                height: 32px;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding-inline-start: 8px;
                display: flex;
                align-items: center;
            }

            .font-details-row {
                display: flex;
                gap: 10px;
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

            p {
                color: #000;
                font-family: Inter;
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: -0.39px;
            }
                
            .hello-world-popup button {
                background-color: #7F7F7F;
                color: white;
                border: none;
                border-radius: 10px;
                padding: 8px 16px;
                margin-top: 15px;
                cursor: pointer;
                font-weight: bold;
                text-align: center;
            }
        `,

        template: `
        <div class="hello-world-popup" id="hello-world-extension-popup">
                <h1>Type Tuner 🪄</h1>
                <h2>Customize how you consume content.</h2>
                <div class="font">
                    <p>Arial</p>
                </div>
                <div class="font-details-row">
                    <div class="font-details"><p>Regular</p></div>
                    <div class="font-details"><p>13</p></div>
                </div>
                <div class="font-details-row">
                    <div class="font-details-col">
                        <h3>Line Height</h3>
                        <div class="font-details"><p>Auto</p></div>
                    </div>
                    <div class="font-details-col">
                        <h3>Letter Spacing</h3>
                        <div class="font-details"><p>0%</p></div>
                    </div>
                </div>                 
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