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
const playerHand = {
	cardsAmount: 0,
	cardsTotal: 0,
	cardsTotalHandSplit1: 0,
	cardsTotalHandSplit2: 0,
	playerCards: [],
	playerCardsValue: [],
	playerCardsFirstHand: [],
	playerCardsSecondHand: [],
	playerCardsFirstHandValue: [],
	playerCardsSecondHandValue: [],
	split: false,
	ThreeCardsInHand: false,
	double: false,
	stand: false,
	aceAdjusted: false,
	aceAdjustedSplit1: false,
	aceAdjustedSplit2: false,
	switchToNextHand: false,
	previousHand: 0,
	firstCard: 0,
	secondCard: 0,
	dealTwoNewCards: 0,

	playerCard(cardSrc) {
		const imageElement = document.createElement("img");
		imageElement.src = cardSrc;
		imageElement.style.width = "125px";
		imageElement.style.height = "125px";
		imageElement.style.zIndex = "2";
		return imageElement;
	},
	playerCardNumber(pokerCard) {
		const value = pokerCard.value;
		this.cardsTotal += value;
		return this.playerCardNumber;
	},

	adjustAceValue() {
		// Check if there is an ace in hand and if the total exceeds 21
		if (
			this.playerCards.includes("ace") &&
			this.cardsTotal > 21 &&
			!this.aceAdjusted
		) {
			this.cardsTotal -= 10; // Change value of ace from 11 to 1
			this.aceAdjusted = true; // Set flag to prevent further adjustments
		}
	},
	adjustAceValueSplit1() {
		// Check if there is an ace in hand and if the total exceeds 21
		if (
			this.playerCardsFirstHand.includes("ace") &&
			this.cardsTotalHandSplit1 > 21 &&
			!this.aceAdjustedSplit1
		) {
			this.cardsTotalHandSplit1 -= 10; // Change value of ace from 11 to 1
			this.aceAdjustedSplit1 = true; // Set flag to prevent further adjustments
		}
	},
	adjustAceValueSplit2() {
		// Check if there is an ace in hand and if the total exceeds 21
		if (
			this.playerCardsSecondHand.includes("ace") &&
			this.cardsTotalHandSplit2 > 21 &&
			!this.aceAdjustedSplit2
		) {
			this.cardsTotalHandSplit2 -= 10; // Change value of ace from 11 to 1
			this.aceAdjustedSplit2 = true; // Set flag to prevent further adjustments
		}
	},

	canThePlayerSplit() {
		if (this.firstCard === this.secondCard && this.playerCards.length === 2) {
			this.split = true;
		}
		if (this.playerCards.length >= 3) {
			this.split = false;
		}
	},

	splitHand() {
		this.playerCardsFirstHand.push(this.playerCards[0]);
		this.playerCardsSecondHand.push(this.playerCards[1]);
		this.playerCards.slice(0, 1);
		this.playerCards.slice(1, 1);
	},
};

const dealerHand = {
	cardsAmount: 0,
	cardsTotal: 0,
	dealerCards: [],
	dealerCardsValue: [],
	firstCard: 0,
	secondCard: 0,
	aceAdjusted: false,

	dealerCard(cardSrc) {
		const imageElement = document.createElement("img");
		imageElement.src = cardSrc;
		imageElement.style.width = "125px";
		imageElement.style.height = "125px";
		imageElement.style.zIndex = "2";
		return imageElement;
	},
	dealerCardNumber(pokerCard) {
		const value = pokerCard.value;
		this.cardsTotal += value;
		return this.dealerCardNumber;
	},
	adjustAceValue() {
		// Check if there is an ace in hand and if the total exceeds 21
		if (
			this.dealerCards.includes("ace") &&
			this.cardsTotal > 21 &&
			!this.aceAdjusted
		) {
			this.cardsTotal -= 10; // Change value of ace from 11 to 1
			this.aceAdjusted = true; // Set flag to prevent further adjustments
		}
	},
};
const blackJackGameButtonContainer = document.createElement("div");
const hitButton = document.createElement("button");
const standButton = document.createElement("button");
const doubleButton = document.createElement("button");
const splitButton = document.createElement("button");
const hitSplitButton = document.createElement("button");
const standSplitButton = document.createElement("button");
const doubleSplitButton = document.createElement("button");
const dealerHitButton = document.createElement("button");
dealerHitButton.disabled = false;
dealerHitButton.style.display = "none";
document.body.append(dealerHitButton);
const buttons = [hitButton, standButton, doubleButton, splitButton];
const splitButtons = [hitSplitButton, standSplitButton, doubleSplitButton];
const blackJackCardDeck = pokerCards.cardDeck;
const playerHandContainer = document.createElement("div");
const playerHandContainer2 = document.createElement("div");
const playerHandNumber = document.createElement("div");
const playerHandNumber2 = document.createElement("div");
const dealerHandNumber = document.createElement("div");
playerHandNumber.classList.add("player-card-number");
playerHandNumber.innerHTML = `${playerHand.cardsTotal}`;
playerHandNumber2.classList.add("player-card-number2");
playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
dealerHandNumber.classList.add("dealer-hand-number");
dealerHandNumber.innerHTML = `${dealerHand.cardsTotal}`;

const dealerHandContainer = document.createElement("div");
const deckOfCards = document.createElement("img");
blackJackCardDeck.getCards();
console.log(blackJackCardDeck.cards);
console.log(blackJackCardDeck.usedCards);

export function chips() {
	const chipsContainerSmallAmounts = document.createElement("div");
	const chipsContainerHighAmounts = document.createElement("div");
	chipsContainerSmallAmounts.classList.add("chips-container-small-rollers");
	chipsContainerHighAmounts.classList.add("chips-container-high-rollers");
	const oneDollarChip = document.createElement("div");
	const fiveDollarChip = document.createElement("div");
	const tenDollarChip = document.createElement("div");
	const fiftyDollarChip = document.createElement("div");
	const oneHundredDollarChip = document.createElement("div");
	const thousandDollarChip = document.createElement("div");
	const fiveThousandDollarChip = document.createElement("div");
	const tenThousandDollarChip = document.createElement("div");
	const moneyChipsSmallAmounts = [
		oneDollarChip,
		fiveDollarChip,
		tenDollarChip,
		fiftyDollarChip,
		oneHundredDollarChip,
		thousandDollarChip,
	];
	const moneyChipsHighAmounts = [
		fiveThousandDollarChip,
		tenThousandDollarChip,
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
	fiftyDollarChip.classList.add("yellow");
	oneHundredDollarChip.classList.add("black");
	thousandDollarChip.classList.add("teal");
	fiveThousandDollarChip.classList.add("tealgreen");
	tenThousandDollarChip.classList.add("bronze");

	document.body.append(chipsContainerSmallAmounts, chipsContainerHighAmounts);
}

export function pokerButtons() {
	blackJackGameButtonContainer.classList.add("blackjack-buttons-container");
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

function pokerSplitButtons() {
	const blackJackGameButtonContainerSplit = document.createElement("div");
	blackJackGameButtonContainerSplit.classList.add(
		"blackjack-buttons-container"
	);
	hitSplitButton.id = "hit-split";
	standSplitButton.id = "stand-split";
	doubleSplitButton.id = "double-split";
	standSplitButton.classList.add("stand-button");
	doubleSplitButton.classList.add("double-button");
	hitSplitButton.textContent = "Hit";
	standSplitButton.textContent = "Stand";
	doubleSplitButton.textContent = "Double";

	splitButtons.forEach((button) => {
		button.classList.add("poker-button");
		blackJackGameButtonContainerSplit.append(button);
	});

	document.body.append(blackJackGameButtonContainerSplit);
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
		playerHandNumber.style.display = "block";
		const randomCard = blackJackCardDeck.getRandomCard();
		const cardSrc = randomCard.src;
		const pokerCardImage = playerHand.playerCard(cardSrc);
		playerHandContainer.append(pokerCardImage);

		let cardValue = randomCard.value;
		const cardName = randomCard.name;
		playerHand.playerCards.push(cardName);
		playerHand.playerCardsValue.push(cardValue);
		if (cardName === "ace") {
			if (playerHand.cardsTotal < 12) {
				cardValue = 11;
				playerHand.cardsTotal += cardValue;
				playerHandNumber.innerHTML = `${playerHand.cardsTotal}`;
			} else if (playerHand.cardsTotal >= 12) {
				cardValue = 1;
				playerHand.cardsTotal += cardValue;
				playerHandNumber.innerHTML = `${playerHand.cardsTotal}`;
			}
		} else {
			playerHand.cardsTotal += cardValue;
			playerHandNumber.innerHTML = `${playerHand.cardsTotal}`;
		}
		playerHand.adjustAceValue();
		playerHandNumber.innerHTML = `${playerHand.cardsTotal}`;

		blackJackCardDeck.removeRandomCard();
		console.log("Black Jack Used cards ");
		console.log(blackJackCardDeck.usedCards);
		console.log("blackjack cards dealer");
		console.log(blackJackCardDeck.cards.length);
		playerHand.canThePlayerSplit();
	});
}

export function BlackJackStandButton() {
	standButton.addEventListener("click", function () {
		dealerHitButton.click();
		console.log("Dealer Hand total is " + dealerHand.cardsTotal);
		const dealerHit = setInterval(() => {
			if (dealerHand.cardsTotal <= 21) {
				dealerHitButton.click();
			}
			if (dealerHand.cardsTotal >= 17) {
				clearInterval(dealerHit);
			}
		}, 3000);
		buttons.forEach((button) => {
			button.style.display = "none";
		});
	});
}
export function BlackJackPlayerFirstTwoCards() {
	hitButton.click();
	document.body.append(playerHandNumber, dealerHandNumber);

	playerHand.firstCard = playerHand.playerCardsValue[0];
	console.log(playerHand.firstCard);
	console.log(playerHand.playerCardsValue[0]);
	setTimeout(() => {
		hitButton.click();
		playerHand.secondCard = playerHand.playerCardsValue[1];
		console.log(playerHand.playerCardsValue[1]);
		playerHand.adjustAceValue();
		playerHand.canThePlayerSplit();
		console.log(playerHand.split);
		playerHandNumber.innerHTML = `${playerHand.cardsTotal}`;
	}, 3000);
}

export function cardsHands() {
	deckOfCards.classList.add("poker-card-back");
	deckOfCards.src = "images/Regular-Game-Cards/pokercard-back.png";
	playerHandContainer.classList.add("black-jack-player-hand");
	playerHandContainer2.classList.add("black-jack-player-hand2");
	dealerHandContainer.classList.add("black-jack-dealer-hand");
	document.body.append(
		playerHandContainer,
		playerHandContainer2,
		dealerHandContainer,
		deckOfCards
	);
}
splitButton.addEventListener("click", function () {
	if (playerHand.split === true) {
		buttons.forEach((button) => {
			button.style.display = "none";
		});
		blackJackGameButtonContainer.style.display = "none";
		pokerSplitButtons();
		let secondImage;
		document.body.append(playerHandNumber2);

		playerHandContainer2.style.display = "flex";
		playerHandContainer.style.left = "5%";
		playerHandNumber.style.left = "22%";
		playerHand.splitHand();
		console.log("player first hand");
		console.log(playerHand.playerCardsFirstHand);
		console.log("player second hand");
		console.log(playerHand.playerCardsSecondHand);

		const images = playerHandContainer.getElementsByTagName("img");
		if (images.length > 0) {
			secondImage = playerHandContainer.removeChild(images[images.length - 1]);
		}
		playerHandContainer2.append(secondImage);
		playerHand.cardsTotal = 0;
		playerHandNumber.innerHTML = `${(playerHand.cardsTotalHandSplit1 =
			playerHand.firstCard)}`;
		playerHandNumber2.innerHTML = `${(playerHand.cardsTotalHandSplit2 =
			playerHand.secondCard)}`;
		dealTwoCardsSplit();
	}
});
function dealTwoCardsSplit() {
	setTimeout(() => {
		hitSplitButton.click();
	}, 1500);
	setTimeout(() => {
		hitSplitButton.click();
	}, 3500);
}

hitSplitButton.addEventListener("click", function () {
	if (playerHand.previousHand != 1) {
		playerHand.dealTwoNewCards += 1;
		const randomCard = blackJackCardDeck.getRandomCard();
		const cardSrc = randomCard.src;
		const pokerCardImage = playerHand.playerCard(cardSrc);
		let cardValue = randomCard.value;
		const cardName = randomCard.name;

		if (playerHand.dealTwoNewCards === 2) {
			playerHandContainer2.append(pokerCardImage);
			playerHand.playerCardsSecondHand.push(cardName);
			playerHand.playerCardsSecondHandValue.push(cardValue);
			if (cardName === "ace") {
				if (playerHand.cardsTotalHandSplit2 < 12) {
					cardValue = 11;
					playerHand.cardsTotalHandSplit2 += cardValue;
					playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
				} else if (playerHand.cardsTotalHandSplit2 >= 12) {
					cardValue = 1;
					playerHand.cardsTotalHandSplit2 += cardValue;
					playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
				}
			} else {
				playerHand.cardsTotalHandSplit2 += cardValue;
				playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
			}
			playerHand.adjustAceValueSplit2();
			playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
		} else {
			playerHandContainer.append(pokerCardImage);
			playerHand.playerCardsFirstHand.push(cardName);
			playerHand.playerCardsFirstHandValue.push(cardValue);
			if (cardName === "ace") {
				if (playerHand.cardsTotalHandSplit1 < 12) {
					cardValue = 11;
					playerHand.cardsTotalHandSplit1 += cardValue;
					playerHandNumber.innerHTML = `${playerHand.cardsTotalHandSplit1}`;
				} else if (playerHand.cardsTotalHandSplit1 >= 12) {
					cardValue = 1;
					playerHand.cardsTotalHandSplit1 += cardValue;
					playerHandNumber.innerHTML = `${playerHand.cardsTotalHandSplit1}`;
				}
			} else {
				playerHand.cardsTotalHandSplit1 += cardValue;
				playerHandNumber.innerHTML = `${playerHand.cardsTotalHandSplit1}`;
			}
			playerHand.adjustAceValueSplit1();
			playerHandNumber.innerHTML = `${playerHand.cardsTotalHandSplit1}`;
		}

		blackJackCardDeck.removeRandomCard();
		console.log("Black Jack Used cards ");
		console.log(blackJackCardDeck.usedCards);
		console.log("blackjack cards dealer");
		console.log(blackJackCardDeck.cards.length);

		console.log("player split first hand");
		console.log(playerHand.playerCardsFirstHand);
		console.log("player second hand split");
		console.log(playerHand.playerCardsSecondHand);
	} else {
		const randomCard = blackJackCardDeck.getRandomCard();
		const cardSrc = randomCard.src;
		const pokerCardImage = playerHand.playerCard(cardSrc);
		playerHandContainer2.append(pokerCardImage);

		let cardValue = randomCard.value;
		const cardName = randomCard.name;
		playerHand.playerCardsSecondHand.push(cardName);
		playerHand.playerCardsSecondHandValue.push(cardValue);
		if (cardName === "ace") {
			if (playerHand.cardsTotalHandSplit2 < 12) {
				cardValue = 11;
				playerHand.cardsTotalHandSplit2 += cardValue;
				playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
			} else if (playerHand.cardsTotalHandSplit2 >= 12) {
				cardValue = 1;
				playerHand.cardsTotalHandSplit2 += cardValue;
				playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
			}
		} else {
			playerHand.cardsTotalHandSplit2 += cardValue;
			playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;
		}
		playerHand.adjustAceValue();
		playerHandNumber2.innerHTML = `${playerHand.cardsTotalHandSplit2}`;

		blackJackCardDeck.removeRandomCard();
		console.log("Black Jack Used cards ");
		console.log(blackJackCardDeck.usedCards);
		console.log("blackjack cards dealer");
		console.log(blackJackCardDeck.cards.length);

		console.log("player split first hand");
		console.log(playerHand.playerCardsFirstHand);
		console.log("player second hand split");
		console.log(playerHand.playerCardsSecondHand);
	}
});

standSplitButton.addEventListener("click", function () {
	playerHand.switchToNextHand = true;
	playerHand.previousHand += 1;
	console.log(playerHand.previousHand);
	if (playerHand.previousHand === 2) {
		splitButtons.forEach((button) => {
			button.style.display = "none";
		});
	}
});

dealerHitButton.addEventListener("click", function () {
	const randomCard = blackJackCardDeck.getRandomCard();
	const cardSrc = randomCard.src;
	const pokerCardImage = dealerHand.dealerCard(cardSrc);
	let cardValue = randomCard.value;
	const cardName = randomCard.name;
	dealerHandContainer.append(pokerCardImage);

	dealerHand.dealerCards.push(cardName);
	dealerHand.dealerCardsValue.push(cardValue);
	if (cardName === "ace") {
		if (dealerHand.cardsTotal < 12) {
			cardValue = 11;
			dealerHand.cardsTotal += cardValue;
			dealerHandNumber.innerHTML = `${dealerHand.cardsTotal}`;
		} else if (dealerHand.cardsTotal >= 12) {
			cardValue = 1;
			dealerHand.cardsTotal += cardValue;
			dealerHandNumber.innerHTML = `${dealerHand.cardsTotal}`;
		}
	} else {
		dealerHand.cardsTotal += cardValue;
		dealerHandNumber.innerHTML = `${dealerHand.cardsTotal}`;
	}
	dealerHand.adjustAceValue();
	dealerHandNumber.innerHTML = `${dealerHand.cardsTotal}`;

	blackJackCardDeck.removeRandomCard();
	console.log("Black Jack Used cards ");
	console.log(blackJackCardDeck.usedCards);
	console.log("blackjack cards dealer");
	console.log(blackJackCardDeck.cards.length);
});

export * from "./blackjack.js";
