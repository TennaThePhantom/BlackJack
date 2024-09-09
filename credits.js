// handles the credits page
const creditsButton = document.getElementById("credits-button");
const CreateTextBox = document.createElement("div");
const CreateText = document.createElement("p");



function creditsBody(){
    CreateTextBox.classList.add("textBox")
    CreateText.classList.add("credits-text");
    CreateTextBox.append(CreateText)
    CreateText.textContent = "Created by Tennessee Foster 9/8/2024" // change date when project is done
    document.body.append(CreateTextBox)
}


creditsButton.addEventListener("click", function () {
    const mainScreenButtons = document.querySelectorAll(".optionSector");
    const mainScreenText = document.getElementById("header-text");
    mainScreenButtons.forEach(button => {
        button.style.display = "none";
    });
    mainScreenText.style.display = "none";
    creditsBody();
});





export * as credits from './credits.js';
