// main javascript code the home page
import { playerBankAccount } from "./blackjack.js";
import * as credits from "./credits.js";
import * as settings from "./settings.js";
import * as blackjack from "/blackjack.js";
const startButton = document.getElementById("start"); // get id from start
const moneyHeader = document.createElement("h1");
const moneyButton1 = document.createElement("button");
const moneyButton2 = document.createElement("button");
const moneyButton3 = document.createElement("button");
const customMoney = document.createElement("button");
const moneyBox = document.createElement("div");
const mainScreenDisplay = document.getElementById("main-screen");
const goBackArrowIcon = document.createElement("i");
const goBackArrowIcon2 = document.createElement("i");
const moneySliderContainer = document.createElement("div");
const slider = document.createElement("input");

function moneyScreen() {
	moneyBox.classList.add("money-box");
	moneyHeader.classList.add("money-header");
	customMoney.id = "custom-money";
	moneyBox.append(
		moneyHeader,
		moneyButton1,
		moneyButton2,
		moneyButton3,
		customMoney
	);
	moneyHeader.textContent = "How much money do you want?";
	moneyButton1.textContent = "300$";
	moneyButton2.textContent = "1000$";
	moneyButton3.textContent = "3000$";
	customMoney.textContent = "Custom Amount";
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

function backToMoneyScreen() {
	goBackArrowIcon2.classList.add("fa-solid", "fa-arrow-left", "left-arrow");
	document.body.append(goBackArrowIcon2);
	goBackArrowIcon2.addEventListener("click", function () {
		moneyBox.style.display = "flex";
		goBackArrowIcon.style.display = "flex";
		mainScreenDisplay.style.display = "none";
		goBackArrowIcon2.style.display = "none";
		moneySliderContainer.style.display = "none"
	});
}

function moneySlider() {
	slider.classList.add("slider");
	slider.setAttribute("type", "range");
	slider.setAttribute("min", "25");
	slider.setAttribute("max", "100000");
	slider.setAttribute("value", "50000");
	slider.setAttribute("class", "slider");
	slider.setAttribute("id", "myRange");
	moneySliderContainer.append(slider);
}

function customMoneyPage() {
	moneySlider();

	const customMoneyHeaderText = document.createElement("h1");
	customMoneyHeaderText.textContent = "Select how much money you want!"
	customMoneyHeaderText.classList.add("header-money-text")


	const moneyText = document.createElement("p");
	moneyText.classList.add("money-text");

	let moneyNumberText = document.createElement("span");
	moneyNumberText.id = "money";
	moneyNumberText.innerHTML = slider.value;

	moneyText.textContent = "Money: ";
	moneyText.append(moneyNumberText);

	moneySliderContainer.classList.add("money-container");
	moneySliderContainer.append(customMoneyHeaderText);
	moneySliderContainer.append(moneyText);
	document.body.append(moneySliderContainer);

	slider.oninput = function () {
		moneyNumberText.innerHTML = this.value;
		let value = ((this.value - this.min) / (this.max - this.min)) * 100;

		this.style.background =
			"linear-gradient(to right, #fefdfd " +
			value +
			"%, #000000 " +
			value +
			"%)";
	};
}

startButton.addEventListener("click", function () {
	mainScreenDisplay.style.display = "none";
	goBackArrowIcon.style.display = "block";
	moneyBox.style.display = "flex";
	moneyScreen();
	backToMainPage();
});

customMoney.addEventListener("click", function () {
	moneyBox.style.display = "none";
	goBackArrowIcon.style.display = "none";
	goBackArrowIcon2.style.display = "Flex";
	moneySliderContainer.style.display = "block"
	backToMoneyScreen();
	customMoneyPage();
});
