class Inst extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Connected logic here (if necessary)
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
        if (name === "click") {
            this.openInstagramAuthPopup();
        }
    }

    static get observedAttributes() {
        return ['click'];
    }
}

customElements.define('inst-auth', Inst);
