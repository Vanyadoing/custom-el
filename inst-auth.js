class Inst extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Good practice for encapsulation
    }

    connectedCallback() {
        // Create a button element, not paragraph
        let button = document.createElement("button");
        button.innerHTML = "Click for Instagram Auth";
        button.addEventListener('click', () => {
            this.openInstagramAuthPopup(); // Use arrow function to keep 'this' context
        });
        this.shadowRoot.appendChild(button); // Use shadowRoot.appendChild to add to the shadow DOM

        window.addEventListener('message', (event) => {
            // Use the origin of your bridge page
            if (event.origin !== "https://www.dev-site-1x3638.wix-dev-center-test.org") {
                console.error("Received message from an unexpected origin:", event.origin);
                return;
            }

            // Check if the message has the structure you expect
            if (event.data.status === 'success' && event.data.code) {
                console.log("Authorization code received:", event.data.code);
                // Proceed with sending the code to your server for exchanging it with an access token
            } else {
                console.error("The message does not contain the expected data");
            }
        });
    }

    openInstagramAuthPopup() {
        const width = 600, height = 750;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);

        const authUrl = 'https://www.dev-site-1x3638.wix-dev-center-test.org/instagram'; // Your intermediary auth page
        const windowFeatures = `toolbar=no, menubar=no, width=${width}, height=${height}, top=${top}, left=${left}`;
        window.open(authUrl, 'InstagramAuth', windowFeatures);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Implementation depends on which attributes you want to observe
    }

    static get observedAttributes() {
        // Return an array of attribute names to observe
        return []; // Example: return ['data-user'];
    }
}

customElements.define('inst-auth', Inst);
