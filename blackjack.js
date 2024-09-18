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
























export * from "./blackjack.js";
