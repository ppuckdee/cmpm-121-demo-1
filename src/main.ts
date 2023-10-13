import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nick's cake game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🍰";
app.append(button);

let counter: number = 0;
let lastMillis = 0;
let fps = 60;

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} cake slices`;
app.append(counterDisplay);

function updateCounter() {
  counter += 1 / fps;
  counterDisplay.innerHTML = `${counter.toFixed(2)} cake slices`;
}

button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `${counter.toFixed(2)} cake slices`;
});

function tick(millis: number) {
  const delta = millis - lastMillis;
  lastMillis = millis;

  if (delta > 0) {
    fps = Math.round(1000 / delta);
  }

  updateCounter();
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
