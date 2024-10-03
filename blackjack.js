// Main game code
import * as pokerCards from "./cards.js";

export const playerBankAccount = {
	playerMoney: 0,
	betAmount: 0,

	updatePlayerMoney(money) {
		this.playerMoney += money;
	},

	getStartingValue() {
		return this.playerMoney;
	},

	updateBetAmount(bet) {
		this.betAmount += bet;
	},

	playerBetting() {
		return this.betAmount;
	},

	resetBetAmount() {
		this.betAmount = 0;
	},
};


const hitButton = document.createElement("button");
const standButton = document.createElement("button");
const doubleButton = document.createElement("button");
const splitButton = document.createElement("button");
const blackJackCardDeck = pokerCards.cardDeck;
const playerHandContainer = document.createElement("div");
const playerHandContainer2 = document.createElement("div");

const dealerHandContainer = document.createElement("div");
const deckOfCards = document.createElement("img")
const playerHand = {
	cardsAmount: 0,
	cardsTotal: 0,
	playerHand: [],
	split: false,
	double: false,
	stand: false,
	
	playerCard(cardSrc){
		const imageElement = document.createElement("img")
		imageElement.src = cardSrc;
		imageElement.style.width = "125px"
		imageElement.style.height = "125px"
		imageElement.style.zIndex = "2"
		return imageElement
	}
}
blackJackCardDeck.getCards();

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
	const buttons = [hitButton, standButton, doubleButton, splitButton];
	hitButton.id = "hit";
	standButton.id = "stand";
	splitButton.id = "split";
	doubleButton.id = "double";
	standButton.classList.add("stand-button");
	doubleButton.classList.add("double-button");
	splitButton.classList.add("split-button");
	hitButton.textContent = "Hit";
	standButton.textContent = "Stand";
	doubleButton.textContent = "Double";
	splitButton.textContent = "Split";

	buttons.forEach((button) => {
		button.classList.add("poker-button");
		blackJackGameButtonContainer.append(button);
	});

	document.body.append(blackJackGameButtonContainer);
}

export function playerMoney() {
	const playerMoneyContainer = document.createElement("div");
	const playerMoneyText = document.createElement("p");
	playerMoneyText.classList.add("player-bank");
	playerMoneyContainer.classList.add("player-bank-container");
	playerMoneyText.innerHTML = `Money: ${playerBankAccount.getStartingValue()}`;

	playerMoneyContainer.append(playerMoneyText);

	document.body.append(playerMoneyContainer);
}

export function BlackJackHitButton() {
	hitButton.addEventListener("click", function () {
		const randomCard = blackJackCardDeck.getRandomCard();
		const cardSrc = randomCard.src;
		const pokerCardImage = playerHand.playerCard(cardSrc);
		playerHandContainer.append(pokerCardImage)
		console.log(randomCard);
		console.log(cardSrc);
	});
}

export function cardsHands(){
	deckOfCards.classList.add("poker-card-back")
	deckOfCards.src = "images/Regular-Game-Cards/pokercard-back.png"
	playerHandContainer.classList.add("black-jack-player-hand");
	playerHandContainer2.classList.add("black-jack-player-hand2")
	dealerHandContainer.classList.add("black-jack-dealer-hand");
	document.body.append(playerHandContainer, playerHandContainer2, dealerHandContainer, deckOfCards)
	
}

export * from "./blackjack.js";
