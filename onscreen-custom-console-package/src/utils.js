export function log(message) {
  const cc = document.querySelector("[data-ref='onscreen-custom-component']");
  cc.log(message);
}
