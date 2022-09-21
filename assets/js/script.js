/* parameter selections */

const season = document.getElementById('season');
const scareLevel = document.getElementById('scare-level');
const rating = document.getElementById('rating')
const movieSuggestion = document.getElementsByClassName('movieSuggestion')
const value = select.options[select.selectedIndex].value;


document.addEventListener("DOMContentLoaded", function() {

    const buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (((select.options[select.selectedIndex].value) === "autumn") && ((select.options[select.selectedIndex].value) === "low") && ((select.options[select.selectedIndex].value) === "r-rating")) {
                alert('Doctor sleep!') ;
            } else {
                let gameType = this.getAttribute("data-type");
                alert('You clicked ${gameType}');
            }

/* Function to determine selections */
