// script.js

// Function to handle button click events
var noButtonPressCount = 0;

function selectOption(option) {
    // Check which option was clicked
    if (option === 'yes') {
        // Flash rainbow colors
        flashRainbowColors(function() {
            document.getElementById('question').style.display = 'none'; // Hide the question
            displayCatHeart(); // Display the cat-heart.gif
        });
    } else if (option === 'no') {
        noButtonPressCount++;
        var noButton = document.getElementById('no-button');
        var yesButton = document.getElementById('yes-button');

         // Increase font size of "Yes" button
         var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
         var newSize = parseFloat(currentFontSize) * 1.2; // Increase font size by 20%
         yesButton.style.fontSize = newSize + 'px';

        // Change text on the "No" button based on the number of times it was pressed
        if (noButtonPressCount === 1) {
            noButton.innerText = 'You sure?';
        } else if (noButtonPressCount === 2) {
            noButton.innerText = 'Really sure?';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 3) {
            noButton.innerText = 'Absolutely sure?';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 4) {
            noButton.innerText = 'Legit ba?';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 5) {
            noButton.innerText = 'Bakit?';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 6) {
            noButton.innerText = 'Ano ba?';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 7) {
            noButton.innerText = 'Ano trip mo?';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 8) {
            noButton.innerText = 'Mag yes ka na kasi';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 9) {
            noButton.innerText = 'Makulit ka ah';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 10) {
            noButton.innerText = 'Pag nag yes ka may regalo ka sakin';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 11) {
            noButton.innerText = '....';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 12) {
            noButton.innerText = 'ANO BA BAT AYAW MO!?!@@)_*#!';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 13) {
            noButton.innerText = 'Sige na one time lang';
            moveButtonToRandomPosition(noButton);
        } else if (noButtonPressCount === 14) {
            noButton.innerText = 'PLEAAAAASSEEE NA';
            moveButtonToRandomPosition(noButton);
        } else {
            noButton.innerText = 'PLEAAAAASSEEEWKASKDF';
            moveButtonToRandomPosition(noButton);
        }

    } else {
        // If neither "Yes" nor "No" was clicked, show an alert message
        alert('Invalid option!');
    }
}

// Function to flash rainbow colors and then execute a callback function
function flashRainbowColors(callback) {
    var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    var i = 0;
    var interval = setInterval(function() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200); // Change color every 200 milliseconds
    setTimeout(function() {
        clearInterval(interval);
        callback();
    }, 2000); // Stop changing colors after 2 seconds and execute the callback
}

// Function to display the cat.gif initially
function displayCat() {
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat
    var catImage = new Image();
    // Set the source (file path) for the cat image
    catImage.src = 'cat.gif'; // Assuming the cat image is named "cat.gif"
    // Set alternative text for the image (for accessibility)
    catImage.alt = 'Cat';
    // When the cat image is fully loaded, add it to the image container
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Function to display the cat-heart.gif
function displayCatHeart() {
    // Clear existing content in the image container
    document.getElementById('image-container').innerHTML = '';
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat-heart
    var catHeartImage = new Image();
    // Set the source (file path) for the cat-heart image
    catHeartImage.src = 'cat-heart.gif'; // Assuming the cat-heart image is named "cat-heart.gif"
    // Set alternative text for the image (for accessibility)
    catHeartImage.alt = 'Cat Heart';
    // When the cat-heart image is fully loaded, add it to the image container
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        // Hide the options container
        document.getElementById('options').style.display = 'none';
    };
}

// Display the cat.gif initially
displayCat();
