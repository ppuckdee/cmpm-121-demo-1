import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nick's cake game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = "0 cake slices";
app.append(counterDisplay);

const button = document.createElement("button");
button.innerHTML = "🍰";
app.append(button);

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase Upgrade (Cost: 10 cake slices)";
upgradeButton.disabled = true;
app.append(upgradeButton);

let counter: number = 0;
let growthRate: number = 0;
let lastMillis = 0;
let fps = 60;

function updateCounter() {
  counter += growthRate / fps;
  counterDisplay.innerHTML = `${counter.toFixed(2)} cake slices`;

  if (counter >= 10) {
    upgradeButton.disabled = false;
  }
}

button.addEventListener("click", () => {
  counter += 1;
  updateCounter();
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    upgradeButton.innerHTML = `Purchase Upgrade (Cost: 10 cake slices)`;
    updateCounter();
  }
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
