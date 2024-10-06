export class CustomConsole extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        #custom-console-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        min-width: 100vw;
        max-width: 100vw;
        z-index: 1000;
        font-family: monospace;
        padding: 10px;
        border-radius: 5px;
        }
    </style>
    <div id="custom-console-container" data-ref="onscreen-custom-console"></div>
    `;
    this.consoleElement = this.shadowRoot.querySelector(
      "#custom-console-container"
    );
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "timeuntilmessagefade") {
      this.timeUntilMessageFade = newValue;
    }
  }

  // Read the attribute value when the element is connected to the DOM
  connectedCallback() {
    const attrValue = this.getAttribute("timeuntilmessagefade");
    if (attrValue) {
      this.timeUntilMessageFade = attrValue;
    }
  }

  log(message) {
    const logMessage = document.createElement("div");
    const timestamp = new Date().toLocaleTimeString();
    logMessage.textContent = `${timestamp}: ${message}`;
    this.consoleElement.appendChild(logMessage);

    setTimeout(() => {
      logMessage.remove();
    }, this.timeUntilMessageFade);
  }
}
