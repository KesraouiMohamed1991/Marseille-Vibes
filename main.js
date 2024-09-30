// Other imports remain unchanged
import "./base.css";
import "./style.css";
import { fragShader } from "./src/canvas/Frag_shader.js";
import { setupCanvases } from "./src/canvas/canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  setupCanvases(fragShader);
  const yearElement = document.getElementById('year');
  const dateElement = document.getElementById('date');
  dateElement.textContent = new Date().toLocaleDateString();
  yearElement.textContent = getyear(); // Set the current year directly
});

// Function to get the current year
function getyear() {
  const date = new Date();
  return date.getFullYear();
}

