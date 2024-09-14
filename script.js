// main javascript code the home page
import * as credits from "./credits.js";
import * as settings from "./settings.js";
const startButton = document.getElementById("start"); // get id from start
const moneyHeader = document.createElement("h1");
const moneyButton1 = document.createElement("button");
const moneyButton2 = document.createElement("button");
const moneyButton3 = document.createElement("button");
const customMoney = document.createElement("button");
const moneyBox = document.createElement("div");
const mainScreenDisplay = document.getElementById("main-screen");
const goBackArrowIcon = document.createElement("i");

function moneyScreen() {
	moneyBox.classList.add("money-box");
	moneyBox.append(
		moneyHeader,
		moneyButton1,
		moneyButton2,
		moneyButton3,
		customMoney
	);
    moneyHeader.textContent = "How much Money do you want?"
    moneyButton1.textContent = "300$"
    moneyButton2.textContent = "1000$"
    moneyButton3.textContent = "3000"
    customMoney.textContent = "Custom Amount"
	document.body.append(moneyBox);
}

function backToMainPage() {
	goBackArrowIcon.classList.add("fa-solid", "fa-arrow-left", "left-arrow");
	document.body.append(goBackArrowIcon);
	goBackArrowIcon.addEventListener("click", function () {
		moneyBox.style.display = "none";
		goBackArrowIcon.style.display = "none";
		mainScreenDisplay.style.display = "flex";
	});
}

startButton.addEventListener("click", function () {
	mainScreenDisplay.style.display = "none";
	goBackArrowIcon.style.display = "block";
    moneyScreen()
	backToMainPage();
});
