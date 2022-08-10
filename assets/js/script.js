// Wait for the DOM to finish loading before running
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "Generate Movie Suggestion") {
                alert("You clicked Generate Movie Suggestion!");
            } else {
                let gameType = this.getAttribute("data-type");
                alert('You clicked ${gameType}');
            }
        })
    }
})
