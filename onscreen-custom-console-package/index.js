import { CustomConsole } from "./src/CustomConsole.js";

// define the web component
customElements.define("onscreen-custom-console", CustomConsole);
// attach the web-component root
const ccEl = document.getElementsByTagName("onscreen-custom-console")[0];
// expose the custom console element to the window namespace
window.cc = ccEl;
