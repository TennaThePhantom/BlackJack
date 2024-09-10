const settingButton = document.getElementById("settings-button");
const themeButton = document.createElement("button");
const musicButton = document.createElement("button");
const goBackArrowIcon = document.createElement("i");
const mainScreenDisplay = document.getElementById("main-screen");
const buttonBox = document.createElement("div")

function settingsBody() {
    buttonBox.classList.add("buttonBox");
	themeButton.classList.add("theme-button");
	musicButton.classList.add("music-button");
    buttonBox.append(themeButton, musicButton)
	themeButton.textContent = "Change Theme";
	musicButton.textContent = "Change Music";
	document.body.append(buttonBox);
}

function backToMainPage() {}

settingButton.addEventListener("click", function () {
	mainScreenDisplay.style.display = "none";
    settingsBody();
});

export * as settings from "./settings.js";
