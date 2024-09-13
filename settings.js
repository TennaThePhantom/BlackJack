const settingButton = document.getElementById("settings-button");
const themeButton = document.createElement("button");
const musicButton = document.createElement("button");
const goBackArrowIcon = document.createElement("i");
const mainScreenDisplay = document.getElementById("main-screen");
const buttonBox = document.createElement("div")
const headerText = document.createElement("h1");

function settingsBody() {
    buttonBox.classList.add("buttonBox");
	themeButton.classList.add("theme-button");
	musicButton.classList.add("music-button");
	headerText.classList.add("settings-header")
    buttonBox.append(themeButton, musicButton, headerText);
	themeButton.textContent = "Change Theme";
	musicButton.textContent = "Change Music";
	headerText.textContent = "Settings"

	document.body.append(buttonBox);
}

function backToMainPage() { // currently on credits page when you click arrow returns back to main page
	goBackArrowIcon.classList.add('fa-solid', 'fa-arrow-left','left-arrow');
	document.body.append(goBackArrowIcon)
	goBackArrowIcon.addEventListener('click', function (){
		buttonBox.style.display = "none"; 
		goBackArrowIcon.style.display = "none";
		mainScreenDisplay.style.display = "flex";
	})
}
settingButton.addEventListener("click", function () {
	mainScreenDisplay.style.display = "none";
	goBackArrowIcon.style.display = "block";
	buttonBox.style.display = "flex";
	settingsBody();
	backToMainPage();
});

export * as settings from "./settings.js";
