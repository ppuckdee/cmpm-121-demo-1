import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nick's cake game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDisplay = document.createElement("div");
let counter = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} cake slices`;
app.append(counterDisplay);

const button = document.createElement("button");
button.innerHTML = "🍰";
app.append(button);

const upgradeButtonA = createUpgradeButton("A", 10, 0.1, 1);
const upgradeButtonB = createUpgradeButton("B", 100, 2.0, 10);
const upgradeButtonC = createUpgradeButton("C", 1000, 50, 100);

app.append(upgradeButtonA, upgradeButtonB, upgradeButtonC);

let growthRate: number = 0.1;
let lastMillis = 0;
let fps = 60;

interface PurchasedItems {
  A: number;
  B: number;
  C: number;
}

const purchasedItems: PurchasedItems = {
  A: 0,
  B: 0,
  C: 0,
};

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(
  1,
)} cake slices/sec`;
app.append(growthRateDisplay);

const itemCountsDisplay = document.createElement("div");
itemCountsDisplay.innerHTML = `Items Purchased: A: ${purchasedItems.A}, B: ${purchasedItems.B}, C: ${purchasedItems.C}`;
app.append(itemCountsDisplay);

const itemCostMultiplier: number = 1.15;

function createUpgradeButton(
  itemName: string,
  cost: number,
  itemRate: number,
  maxRate: number,
) {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Purchase ${itemName} (Cost: ${cost.toFixed(
    2,
  )} cake slices)`;
  upgradeButton.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost;
      growthRate += itemRate;
      if (growthRate > maxRate) {
        growthRate = maxRate;
      }
      purchasedItems[itemName as keyof PurchasedItems]++;
      cost *= itemCostMultiplier;
      updateUpgradeButtonLabel(upgradeButton, itemName, cost);
      updateCounter();
      updateGrowthRateDisplay();
      updateItemCountsDisplay();
    }
  });
  return upgradeButton;
}

function updateCounter() {
  counter += growthRate / fps;
  counterDisplay.innerHTML = `${counter.toFixed(2)} cake slices`;
}

function updateGrowthRateDisplay() {
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(
    1,
  )} cake slices/sec`;
}

function updateItemCountsDisplay() {
  itemCountsDisplay.innerHTML = `Items Purchased: A: ${purchasedItems.A}, B: ${purchasedItems.B}, C: ${purchasedItems.C}`;
}

function updateUpgradeButtonLabel(
  button: HTMLButtonElement,
  itemName: string,
  cost: number,
) {
  button.innerHTML = `Purchase ${itemName} (Cost: ${cost.toFixed(
    2,
  )} cake slices)`;
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
