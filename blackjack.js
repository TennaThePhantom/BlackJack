// Main game code
export const playerBankAccount = {
	playerMoney: 0,

	updatePlayerMoney(money) {
		this.playerMoney += money;
	},

	getStartingValue() {
		return this.playerMoney;
	},
};

const playerHandContainer = document.createElement("div");
const dealerHandContainer = document.createElement("div");

export function chips() {
	const chipsContainerSmallAmounts = document.createElement("div");
	const chipsContainerHighAmounts = document.createElement("div");
	chipsContainerSmallAmounts.classList.add("chips-container-small-rollers");
	chipsContainerHighAmounts.classList.add("chips-container-high-rollers");
	const oneDollarChip = document.createElement("div");
	const fiveDollarChip = document.createElement("div");
	const tenDollarChip = document.createElement("div");
	const twentyFiveDollarChip = document.createElement("div");
	const fiftyDollarChip = document.createElement("div");
	const oneHundredDollarChip = document.createElement("div");
	const TwoHundredFiftyDollarChip = document.createElement("div");
	const fiveHundredDollarChip = document.createElement("div");
	const thousandDollarChip = document.createElement("div");
	const fiveThousandDollarChip = document.createElement("div");
	const tenThousandDollarChip = document.createElement("div");
	const twentyFiveThousandDollarChip = document.createElement("div");
	const FiftyThousandDollarChip = document.createElement("div");

	const moneyChipsSmallAmounts = [
		oneDollarChip,
		fiveDollarChip,
		tenDollarChip,
		twentyFiveDollarChip,
		fiftyDollarChip,
		oneHundredDollarChip,
		TwoHundredFiftyDollarChip,
		fiveHundredDollarChip,
		thousandDollarChip,
	];
	const moneyChipsHighAmounts = [
		fiveThousandDollarChip,
		tenThousandDollarChip,
		twentyFiveThousandDollarChip,
		FiftyThousandDollarChip,
	];

	moneyChipsSmallAmounts.forEach((chip) => {
		chipsContainerSmallAmounts.append(chip);
		chip.classList.add("pokerchip");
	});
	moneyChipsHighAmounts.forEach((chip) => {
		chipsContainerHighAmounts.append(chip);
		chip.classList.add("pokerchip");
	});
	oneDollarChip.classList.add("white");
	fiveDollarChip.classList.add("red");
	tenDollarChip.classList.add("blue");
	twentyFiveDollarChip.classList.add("green");
	fiftyDollarChip.classList.add("yellow");
	oneHundredDollarChip.classList.add("black");
	TwoHundredFiftyDollarChip.classList.add("purple");
	fiveHundredDollarChip.classList.add("orange");
	thousandDollarChip.classList.add("teal");
	fiveThousandDollarChip.classList.add("tealgreen");
	tenThousandDollarChip.classList.add("bronze");
	twentyFiveThousandDollarChip.classList.add("silver");
	FiftyThousandDollarChip.classList.add("gold");

	document.body.append(chipsContainerSmallAmounts, chipsContainerHighAmounts);
}

export function pokerButtons() {
	const blackJackGameButtonContainer = document.createElement("div");
	blackJackGameButtonContainer.classList.add("blackjack-buttons-container");
	const hitButton = document.createElement("button");
	const standButton = document.createElement("button");
	const doubleButton = document.createElement("button");
	const splitButton = document.createElement("button");
	const buttons = [hitButton, standButton, doubleButton, splitButton];
	standButton.classList.add("stand-button");
	doubleButton.classList.add("double-button");
	splitButton.classList.add("split-button");
	hitButton.textContent = "Hit"
	standButton.textContent = "Stand"
	doubleButton.textContent = "Double"
	splitButton.textContent = "Split"

	buttons.forEach((button) => {
		button.classList.add("poker-button");
		blackJackGameButtonContainer.append(button);
	});

	document.body.append(blackJackGameButtonContainer);
}

export * from "./blackjack.js";
