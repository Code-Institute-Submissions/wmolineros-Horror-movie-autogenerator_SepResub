// Wait for the DOM to finish loading before running
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementsByTagName("button");

    for (let button of button) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit!");
            } else {
                let gameType = this.getAttribute("data-type");
                alert('You clicked ${gameType}');
            }
        })
    }
})

function generateMovie()  {
    let season = ['autumn', 'fall', 'spring', 'summer'];
    let scarelevel = ['low', 'medium', 'high', 'extreme'];
    let rating = ['pg', 'pg-13', 'r-rating', 'x-rating'];

    let result('autumn'+'low'+'pg') = 'Coraline';
    console.log(result);
}