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
		if (this.playerMoney >= this.betAmount + bet) {
			this.betAmount += bet;
			return this.betAmount;
		} else {
			return this.betAmount; // Return current bet amount without updating
		}
	},

	playerBetting() {
		return this.betAmount;
	},

	resetBetAmount() {
		this.betAmount = 0;
		return this.betAmount;
	},

	continueToNextGame(playerNewMoney) {
		this.betAmount = 0;
		this.playerMoney = playerNewMoney;
		return this.playerMoney;
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

	resetToNextGame() {
		this.cardsAmount = 0;
		this.cardsTotal = 0;
		this.cardsTotalHandSplit1 = 0;
		this.cardsTotalHandSplit2 = 0;
		this.playerCards = [];
		this.playerCardsValue = [];
		this.playerCardsFirstHand = [];
		this.playerCardsSecondHand = [];
		this.playerCardsFirstHandValue = [];
		this.playerCardsSecondHandValue = [];
		this.split = false;
		this.ThreeCardsInHand = false;
		this.double = false;
		this.stand = false;
		this.aceAdjusted = false;
		this.aceAdjustedSplit1 = false;
		this.aceAdjustedSplit2 = false;
		this.switchToNextHand = false;
		this.previousHand = 0;
		this.firstCard = 0;
		this.secondCard = 0;
		this.dealTwoNewCards = 0;

		return this;
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

	resetToNextGame() {
		this.cardsAmount = 0;
		this.cardsTotal = 0;
		this.dealerCards = [];
		this.dealerCardsValue = [];
		this.firstCard = 0;
		this.secondCard = 0;
		this.aceAdjusted = false;
		return this;
	},
};

const dealerAndPlayerGameWinner = {
	playerWon: null,
	dealerWon: null,
	playerWentOver21: null,
	dealerWentOver21: null,

	resetToNextGame() {
		this.playerWon = null;
		this.dealerWon = null;
		this.playerWentOver21 = null;
		this.dealerWentOver21 = null;
		return this;
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
const playerBetAmountText = document.createElement("p");

const chipsContainerSmallAmounts = document.createElement("div");
const chipsContainerHighAmounts = document.createElement("div");
const dealerHandContainer = document.createElement("div");
const deckOfCards = document.createElement("img");
const resetBet = document.createElement("button");
const confirmButton = document.createElement("button");
blackJackCardDeck.getCards();
console.log(blackJackCardDeck.cards);
console.log(blackJackCardDeck.usedCards);

export function chips() {
	chipsContainerSmallAmounts.style.display = "flex";
	chipsContainerHighAmounts.style.display = "flex";
	chipsContainerSmallAmounts.classList.add("chips-container-small-rollers");
	chipsContainerHighAmounts.classList.add("chips-container-high-rollers");
	const twentyFiveCentChip = document.createElement("div");
	twentyFiveCentChip.setAttribute("data-value", "0.25");
	const oneDollarChip = document.createElement("div");
	oneDollarChip.setAttribute("data-value", "1");
	const fiveDollarChip = document.createElement("div");
	fiveDollarChip.setAttribute("data-value", "5");
	const tenDollarChip = document.createElement("div");
	tenDollarChip.setAttribute("data-value", "10");
	const fiftyDollarChip = document.createElement("div");
	fiftyDollarChip.setAttribute("data-value", "50");
	const oneHundredDollarChip = document.createElement("div");
	oneHundredDollarChip.setAttribute("data-value", "100");

	const thousandDollarChip = document.createElement("div");
	thousandDollarChip.setAttribute("data-value", "1000");

	const fiveThousandDollarChip = document.createElement("div");
	fiveThousandDollarChip.setAttribute("data-value", "5000");

	const tenThousandDollarChip = document.createElement("div");
	tenThousandDollarChip.setAttribute("data-value", "10000");

	const moneyChipsSmallAmounts = [
		twentyFiveCentChip,
		oneDollarChip,
		fiveDollarChip,
		tenDollarChip,
		fiftyDollarChip,
		oneHundredDollarChip,
		thousandDollarChip,
	];
	const moneyChipsHighAmounts = [fiveThousandDollarChip, tenThousandDollarChip];

	moneyChipsSmallAmounts.forEach((chip) => {
		chipsContainerSmallAmounts.append(chip);
		chip.classList.add("pokerchip");
		chip.addEventListener("click", function () {
			let chipValue = parseFloat(chip.getAttribute("data-value"), 10);
			playerBetAmountText.innerHTML = `Bet: ${playerBankAccount.updateBetAmount(
				chipValue
			)}`;
		});
	});
	moneyChipsHighAmounts.forEach((chip) => {
		chipsContainerHighAmounts.append(chip);
		chip.classList.add("pokerchip");
		chip.addEventListener("click", function () {
			let chipValue = parseFloat(chip.getAttribute("data-value"), 10);
			playerBetAmountText.innerHTML = `Bet: ${playerBankAccount.updateBetAmount(
				chipValue
			)}`;
		});
	});
	twentyFiveCentChip.classList.add("orange");
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
	blackJackGameButtonContainer.style.display = "flex";
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
		button.style.display = "block";
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
	const playerMoneyContainer2 = document.createElement("div");
	const buttonsContainer = document.createElement("div");
	resetBet.textContent = "Rest Bet Amount";
	confirmButton.textContent = "Confirm Bet";
	buttonsContainer.style.display = "flex";
	resetBet.style.display = "block";
	confirmButton.style.display = "block";

	const playerMoneyText = document.createElement("p");
	playerMoneyText.classList.add("player-bank");
	playerBetAmountText.classList.add("player-bank");
	playerMoneyContainer.classList.add("player-bank-container");
	playerMoneyContainer2.classList.add("player-bank-container2");
	buttonsContainer.classList.add("chips-button-container");
	playerMoneyText.innerHTML = `Money: ${playerBankAccount.getStartingValue()}`;
	playerBetAmountText.innerHTML = `Bet: ${playerBankAccount.playerBetting()}`;
	playerMoneyContainer.append(playerMoneyText);
	playerMoneyContainer2.append(playerBetAmountText);
	buttonsContainer.append(resetBet, confirmButton);
	document.body.append(
		playerMoneyContainer,
		playerMoneyContainer2,
		buttonsContainer
	);
}

function resetButtonHandler() {
	playerBetAmountText.innerHTML = `Bet: ${playerBankAccount.resetBetAmount()}`;
}
resetBet.addEventListener("click", resetButtonHandler);

function confirmButtonHandler() {
	if (playerBankAccount.betAmount >= 0.01) {
		chipsContainerSmallAmounts.style.display = "none";
		chipsContainerHighAmounts.style.display = "none";
		confirmButton.style.display = "none";
		resetBet.style.display = "none";
		pokerButtons();
		cardsHands();
		BlackJackHitButton();
		BlackJackPlayerFirstTwoCards();
		BlackJackStandButton();
	}
}

confirmButton.addEventListener("click", confirmButtonHandler);

function hitButtonHandler() {
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
	console.log("black Jack current cards");
	console.log(blackJackCardDeck.cards);
	console.log("Black Jack Used cards ");
	console.log(blackJackCardDeck.usedCards);
	console.log("blackjack cards dealer");
	console.log(blackJackCardDeck.cards.length);
	playerHand.canThePlayerSplit();
}

export function BlackJackHitButton() {
	hitButton.addEventListener("click", hitButtonHandler);
}

function blackJackStandButtonHandler() {
	dealerHitButton.click();
	console.log("Dealer Hand total is " + dealerHand.cardsTotal);
	const dealerHit = setInterval(() => {
		if (dealerHand.cardsTotal <= 21) {
			dealerHitButton.click();
		}
		if (dealerHand.cardsTotal >= 17) {
			clearInterval(dealerHit);
			whoWins();
			setTimeout(() => {
				hideGame();
				popUpHandOverScreen();
			}, 2000);
		}
	}, 3000);
	buttons.forEach((button) => {
		button.style.display = "none";
	});
}

export function BlackJackStandButton() {
	standButton.addEventListener("click", blackJackStandButtonHandler);
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
	dealerHandNumber.style.display = "block";
	playerHandContainer.style.display = "flex";
	deckOfCards.style.display = "block";
	dealerHandContainer.style.display = "flex";
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
function splitButtonHandler() {
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
}
splitButton.addEventListener("click", splitButtonHandler);

function dealTwoCardsSplit() {
	setTimeout(() => {
		hitSplitButton.click();
	}, 1500);
	setTimeout(() => {
		hitSplitButton.click();
	}, 3500);
}

function hitSplitButtonHandler() {
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
}
hitSplitButton.addEventListener("click", hitSplitButtonHandler);

function standSplitButtonHandler() {
	playerHand.switchToNextHand = true;
	playerHand.previousHand += 1;
	console.log(playerHand.previousHand);
	if (playerHand.previousHand === 2) {
		splitButtons.forEach((button) => {
			button.style.display = "none";
		});
	}
}
standSplitButton.addEventListener("click", standSplitButtonHandler);

function dealerHitButtonHandler() {
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
}
dealerHitButton.addEventListener("click", dealerHitButtonHandler);

function whoWins() {
	const playerOver21 = playerHand.cardsTotal > 21;
	const dealerOver21 = dealerHand.cardsTotal > 21;

	if (playerOver21 && dealerOver21) {
		console.log("Both players went over 21 - no winner");
		dealerAndPlayerGameWinner.playerWon = false;
		dealerAndPlayerGameWinner.dealerWon = false;
		return;
	}

	if (playerOver21) {
		console.log("Player has over 21 and loses");
		dealerAndPlayerGameWinner.dealerWon = true;
		dealerAndPlayerGameWinner.playerWentOver21 = true;
		return;
	}

	if (dealerOver21) {
		console.log("Dealer has over 21 and loses - player wins");
		dealerAndPlayerGameWinner.playerWon = true;
		dealerAndPlayerGameWinner.dealerWentOver21 = true;
		return;
	}

	if (playerHand.cardsTotal > dealerHand.cardsTotal) {
		console.log("Player hand is higher than dealer - player wins");
		dealerAndPlayerGameWinner.playerWon = true;
	} else if (dealerHand.cardsTotal > playerHand.cardsTotal) {
		console.log("Dealer hand is higher than player - dealer wins");
		dealerAndPlayerGameWinner.dealerWon = true;
	} else {
		console.log("It's a tie");
		dealerAndPlayerGameWinner.playerWon = false;
		dealerAndPlayerGameWinner.dealerWon = false;
	}
}

function hideGame() {
	const divs = document.querySelectorAll("div");
	const images = document.querySelectorAll("img");

	// Hide each div element
	divs.forEach((div) => (div.style.display = "none"));

	// Hide each img element
	images.forEach((img) => (img.style.display = "none"));
}

function popUpHandOverScreen() {
	const gameScreen = document.createElement("div");
	gameScreen.classList.add("game-screen");
	const text = document.createElement("p");
	const gameTextInfo = document.createElement("p");
	const gameButton = document.createElement("button");
	const gameButton2 = document.createElement("button");
	const earnings = playerBankAccount.betAmount * 2;
	const playerBank = playerBankAccount.playerMoney;
	let playerNewMoney = playerBank;
	gameButton.textContent = "Quit";
	gameButton2.textContent = "Play Again";

	if (dealerAndPlayerGameWinner.playerWon === true) {
		playerNewMoney = playerBank + earnings;
		text.textContent = `You Won ${earnings}$`;
		gameTextInfo.textContent = `Current Balance ${[playerNewMoney]}`;
	}
	if (dealerAndPlayerGameWinner.dealerWon === true) {
		playerNewMoney = playerBank - playerBankAccount.betAmount;
		text.textContent = `You lose ${playerBankAccount.betAmount}$`;
		gameTextInfo.textContent = `Current Balance ${playerNewMoney}`;
	}
	if (
		dealerAndPlayerGameWinner.playerWon === false &&
		dealerAndPlayerGameWinner.dealerWon === false
	) {
		text.textContent = "It's A Draw";
	}

	gameButton.addEventListener("click", function () {
		window.location.reload();
	});

	gameButton2.addEventListener("click", function () {
		hitButton.removeEventListener("click", hitButtonHandler);
		standButton.removeEventListener("click", blackJackStandButtonHandler);
		splitButton.removeEventListener("click", splitButtonHandler);
		hitSplitButton.removeEventListener("click", hitSplitButtonHandler);
		standSplitButton.removeEventListener("click", standSplitButtonHandler);
		dealerHitButton.removeEventListener("click", dealerHitButtonHandler);
		gameScreen.style.display = "none";
		playerBankAccount.continueToNextGame(playerNewMoney);
		playerHand.resetToNextGame();
		dealerHand.resetToNextGame();
		dealerAndPlayerGameWinner.resetToNextGame();
		chips();
		playerMoney();
	});

	gameScreen.append(text, gameTextInfo, gameButton, gameButton2);

	document.body.append(gameScreen);
}

export * from "./blackjack.js";
