export function triggerEsc() {
  // Create a new KeyboardEvent to simulate an Escape key press
  const escapeEvent = new KeyboardEvent("keydown", {
    key: "Escape",
    keyCode: 27,
    code: "Escape",
    which: 27,
    bubbles: true,
  });

  // Dispatch the event on the target element or the document
  document.dispatchEvent(escapeEvent);
}
