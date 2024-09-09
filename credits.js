// handles the credits page
// this isn't finish just the start of credits text want to think about this more what to say

const creditsButton = document.getElementById("credits-button");
const TextBox = document.createElement("div");
const creditsText = document.createElement("p");
const creditsHeader = document.createElement("h1");
const collegeText = document.createElement("p");
const goBackArrow = document.createElement("i") // <i class="fa-solid fa-arrow-left"></i> 

function creditsBody() {
	TextBox.classList.add("textBox");
	creditsText.classList.add("credits-text");
	creditsHeader.classList.add("credits-header");
	collegeText.classList.add("college-text");
	TextBox.append(creditsText);
	TextBox.append(creditsHeader);
	TextBox.append(collegeText);
	creditsHeader.textContent = "Credits";
	creditsText.textContent = "Created by Tennessee Foster 9/8/2024"; // change date when project is done
	collegeText.textContent = "Umass Lowell Student Third Year Student";
	document.body.append(TextBox);
}

function backToMainPage() {

}

creditsButton.addEventListener("click", function () {
	const mainScreenButtons = document.querySelectorAll(".optionSector");
	const mainScreenText = document.getElementById("header-text");
	mainScreenButtons.forEach((button) => {
		button.style.display = "none";
	});
	mainScreenText.style.display = "none";
	creditsBody();
});

export * as credits from "./credits.js";
