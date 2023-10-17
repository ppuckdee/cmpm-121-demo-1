import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Nick's cake game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDisplay = document.createElement("div");
let counter = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} cakes`;
app.append(counterDisplay);

const mainButton = createMainButton();
app.append(mainButton);

const availableItems: Item[] = [
  { name: "🍰", cost: 10, rate: 0.1, description: "Sells one cake slice" },
  {
    name: "👩‍🍳",
    cost: 100,
    rate: 2,
    description: "Hires chef for faster production",
  },
  { name: "🏠", cost: 1000, rate: 50, description: "Opens up bakery" },
  {
    name: "🧁",
    cost: 5000,
    rate: 200,
    description: "Adds cupcakes to Bakery menu",
  },
  {
    name: "🎂",
    cost: 25000,
    rate: 1000,
    description: "Opens up cake distribution center",
  },
];

const upgradeButtons: HTMLButtonElement[] = [];

availableItems.forEach((item) => {
  const upgradeButton = createUpgradeButton(item);
  upgradeButtons.push(upgradeButton);
  app.append(upgradeButton);
});

let growthRate: number = 0;
let lastMillis = 0;
let fps = 60;

const purchasedItems: { [key: string]: number } = {};

availableItems.forEach((item) => {
  purchasedItems[item.name] = 0;
});

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${
  availableItems[0].name
}s/sec`;
app.append(growthRateDisplay);

const itemCountsDisplay = document.createElement("div");
itemCountsDisplay.innerHTML = `Items Purchased: ${getItemCountsDisplayText()}`;
app.append(itemCountsDisplay);

const itemCostMultiplier: number = 1.15;

function createMainButton() {
  const mainButton = document.createElement("button");
  mainButton.innerHTML = "Click to Bake a Cake";
  mainButton.addEventListener("click", () => {
    counter += 1;
    updateCounter();
  });
  return mainButton;
}

function createUpgradeButton(item: Item) {
  const upgradeButton = document.createElement("button");
  const costInCakes = item.cost.toFixed(2) + " 🍰s";
  upgradeButton.innerHTML = `Purchase ${item.name} (Cost: ${costInCakes}) - ${item.description}`;
  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      purchasedItems[item.name]++;
      item.cost *= itemCostMultiplier;
      updateUpgradeButtonLabel(upgradeButton, item);
      updateCounter();
      updateGrowthRateDisplay();
      updateItemCountsDisplay();
    }
  });
  return upgradeButton;
}

function updateCounter() {
  counter += growthRate / fps;
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${availableItems[0].name}s`;

  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < availableItems[index].cost;
  });
}

function updateGrowthRateDisplay() {
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${
    availableItems[0].name
  }s/sec`;
}

function updateItemCountsDisplay() {
  itemCountsDisplay.innerHTML = `Items Purchased: ${getItemCountsDisplayText()}`;
}

function updateUpgradeButtonLabel(button: HTMLButtonElement, item: Item) {
  button.innerHTML = `Purchase ${item.name} (Cost: ${item.cost.toFixed(2)} ${
    item.name
  }s) - ${item.description}`;
}

function getItemCountsDisplayText() {
  return availableItems
    .map((item) => `${item.name}: ${purchasedItems[item.name]}`)
    .join(", ");
}

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
