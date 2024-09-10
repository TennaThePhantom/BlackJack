// handles the credits page
// this isn't finish just the start of credits text want to think about this more what to say

const creditsButton = document.getElementById("credits-button");
const TextBox = document.createElement("div");
const creditsText = document.createElement("p");
const creditsHeader = document.createElement("h1");
const collegeText = document.createElement("p");
const goBackArrowIcon = document.createElement("i") 
const mainScreenDisplay = document.getElementById("main-screen");

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

function backToMainPage() { // currently on credits page when you click arrow returns back to main page
	goBackArrowIcon.classList.add('fa-solid', 'fa-arrow-left','left-arrow');
	document.body.append(goBackArrowIcon)
	goBackArrowIcon.addEventListener('click', function (){
		TextBox.style.display = "none"; 
		goBackArrowIcon.style.display = "none";
		mainScreenDisplay.style.display = "flex";
	})
}

creditsButton.addEventListener("click", function () {
	TextBox.style.display = "flex";
	goBackArrowIcon.style.display = "block";
	mainScreenDisplay.style.display = "none";
	creditsBody();
	backToMainPage();
});

export * as credits from "./credits.js";
