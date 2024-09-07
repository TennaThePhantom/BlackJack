// handles the credits page
const creditsButton = document.getElementById("credits-button");


creditsButton.addEventListener("click", function () {
    const mainScreenButtons = document.querySelectorAll(".optionSector");
    const mainScreenText = document.getElementById("header-text");
    mainScreenButtons.forEach(button => {
        button.style.display = "none";
    });
    mainScreenText.style.display = "none";
});



export * as credits from './credits.js';
