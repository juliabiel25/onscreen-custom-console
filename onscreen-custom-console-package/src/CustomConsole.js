export class CustomConsole extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tags = {};
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

  log(message, tagName = null) {
    // create the log message element and append to the DOM
    const logMessage = document.createElement("div");
    const timestamp = new Date().toLocaleTimeString();
    logMessage.textContent = `${timestamp}${
      tagName && ` [${tagName}]`
    }: ${message}`;
    if (tagName && this.tags[tagName]) {
      // assign the message color
      logMessage.style.color = this.tags[tagName]?.color;
    }
    this.consoleElement.appendChild(logMessage);

    // remove the element after a set time
    setTimeout(() => {
      logMessage.remove();
    }, this.timeUntilMessageFade);
  }

  setSettings(settingName, newValue) {
    this[settingName] = newValue;
  }
}
