// Questions and answers
const questions = [
    { text: "Hiii Honeyy!!! 💕", answers: ["Hiii !!!!"] },
    { text: "I’m glad you took the time off your day to open this website :DDD", answers: ["Of course !!!"] },
    { text: "As you know, there’s a specific day coming up!", answers: ["Mhmm !!!"] },
    { text: "And you, being the one that I love most, I just want to ask you something very important!", answers: ["What is it :ooo"] },
    { text: "Will you Be My Valentine? 💖", answers: ["Yes 😍", "No 😔"], special: true },
    { text: "YIPPEEEEE!!! For saying yes and being the coolest most loving most adorable person ever, 🎉 I made a special gift for you that you could always look back on no matter what! 🎉", answers: ["🎁 Open Your Gift! 🎁"], link: "YOUR_LINK_HERE" }
];

let currentQuestion = 0;
let noButtonPressCount = 0;
let catGifDisplayed = false; // Track if the cat gif is displayed

function nextQuestion(index) {
    if (index >= questions.length) return; // Stop if we run out of questions

    currentQuestion = index;
    let questionContainer = document.getElementById("question-container");
    let questionElement = document.getElementById("question");
    let optionsContainer = document.getElementById("options");

    // Clear previous content
    questionElement.innerHTML = "";
    optionsContainer.innerHTML = "";

    // Set the question text
    questionElement.innerHTML += questions[index].text;

    // Display cat.gif only for the "Will you Be My Valentine?" question (index 4)
    if (index === 4 && !catGifDisplayed) {
        displayCatGif(); // Display cat gif when this question is shown
    }

    // Create buttons for the answers
    questions[index].answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;

        // Special handling for the Valentine question
        if (questions[index].special) {
            button.onclick = answer === "Yes 😍" ? () => selectOption("yes") : () => selectOption("no");
        } 
        // Redirect to a special gift if it's the final question
        else if (questions[index].link) {
            button.onclick = () => window.location.href = questions[index].link;
        } 
        // Otherwise, go to the next question
        else {
            button.onclick = () => nextQuestion(index + 1);
        }

        optionsContainer.appendChild(button);
    });
}

// Handles "Will You Be My Valentine?" responses
function selectOption(option) {
    let questionDiv = document.getElementById('question-container');
    let yesButton = document.querySelector("#options button:first-child");
    let noButton = document.querySelector("#options button:last-child");

    if (option === 'yes') {
        flashRainbowColors(() => {
            questionDiv.style.display = 'none';
            displayCatHeart();
            nextQuestion(5);  // Proceed to next question after "Yes"
        });
    } else if (option === 'no') {
        noButtonPressCount++;
        
        // Increase font size of the "Yes" button
        let currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        let newSize = parseFloat(currentFontSize) * 1.2;
        yesButton.style.fontSize = newSize + 'px';

        // Change "No" button text progressively
        let noTexts = [
            'You sure?', 'Really sure?', 'Absolutely sure?', 'Legit ba?', 'Bakit?', 'Ano ba?', 
            'Ano trip mo?', 'Mag yes ka na kasi', 'Makulit ka ah', 'Pag nag yes ka may regalo ka sakin', 
            '....', 'ANO BA BAT AYAW MO!?!@@)_*#!', 'Sige na one time lang', 'PLEAAAAASSEEE NA', 
            'PLEAAAAASSEEEWKASKDF'
        ];

        noButton.innerText = noTexts[Math.min(noButtonPressCount, noTexts.length - 1)];
        moveButtonToRandomPosition(noButton);
    }
}

// Flash rainbow effect when "Yes" is selected
function flashRainbowColors(callback) {
    let colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    let i = 0;
    let interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = '#FADADD';
        callback();
    }, 2000);
}

// Display a cute cat-heart gif when "Yes" is selected, with flowers on both sides
function displayCatHeart() {
    document.getElementById('image-container').innerHTML = ''; // Clear previous images

    let imageContainer = document.getElementById('image-container');
    
    // Create a wrapper div for better alignment
    let wrapperDiv = document.createElement("div");
    wrapperDiv.style.display = "flex";
    wrapperDiv.style.alignItems = "center";
    wrapperDiv.style.justifyContent = "center";
    wrapperDiv.style.gap = "10px"; // Small gap between images
    
    // Function to create 3 flowers in a column
    function createFlowerColumn() {
        let flowerColumn = document.createElement("div");
        flowerColumn.style.display = "flex";
        flowerColumn.style.flexDirection = "column";
        flowerColumn.style.alignItems = "center";
        flowerColumn.style.gap = "5px"; // Adjust spacing between flowers

        for (let i = 0; i < 3; i++) {
            let flowerGif = new Image();
            flowerGif.src = "flowers.gif"; 
            flowerGif.alt = "Flower";
            flowerGif.style.width = "60px"; // Adjust size as needed
            flowerGif.style.height = "auto";
            flowerColumn.appendChild(flowerGif);
        }
        return flowerColumn;
    }

    // Create left flower column
    let leftFlowers = createFlowerColumn();
    
    // Create cat-heart gif
    let catHeartImage = new Image();
    catHeartImage.src = "cat-heart.gif"; 
    catHeartImage.alt = "Cat Heart";
    catHeartImage.style.width = "150px"; // Adjust as needed
    catHeartImage.style.height = "auto";

    // Create right flower column
    let rightFlowers = createFlowerColumn();
    
    // Append elements in order: flowers - cat-heart - flowers
    wrapperDiv.appendChild(leftFlowers);
    wrapperDiv.appendChild(catHeartImage);
    wrapperDiv.appendChild(rightFlowers);

    // Append wrapper to image-container
    imageContainer.appendChild(wrapperDiv);

    // Ensure the final question is displayed
    document.getElementById('question-container').style.display = 'block';
    displayFinalQuestion();
}

// Display cat.gif during the "Will you Be My Valentine?" question
function displayCatGif() {
    catGifDisplayed = true; // Set flag to true so it doesn't get shown again
    let imageContainer = document.getElementById('image-container');
    let catGifImage = new Image();
    catGifImage.src = 'cat.gif'; // The cat gif file name
    catGifImage.alt = 'Cat Gif';
    imageContainer.appendChild(catGifImage);
}

// Display the final question with the gift link
function displayFinalQuestion() {
    let finalQuestion = questions[5];
    document.getElementById("question").innerText = finalQuestion.text;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous buttons

    document.getElementById("question-container").classList.add("final-message");

    finalQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = function () {
            spinIanHeadAndRedirect(finalQuestion.link); // Ensure this triggers
        };
        optionsContainer.appendChild(button);
    });
}

// Move the "No" button randomly to make it hard to press
function moveButtonToRandomPosition(button) {
    let maxX = window.innerWidth - button.clientWidth - 50;
    let maxY = window.innerHeight - button.clientHeight - 50;
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

// Function to spin the IanHead logo and redirect
function spinIanHeadAndRedirect(url) {
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    let img = document.createElement("img");
    img.src = "IanHead.png"; // Ensure the file exists
    img.style.width = "100px"; // Initial size
    img.style.height = "100px";
    img.style.animation = "spin-grow-shrink 1.5s ease-in-out forwards"; // Apply the spinning animation

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // Redirect after animation
    setTimeout(() => {
        window.location.href = url;
    }, 1500); // 1.5 seconds delay for animation
}


// Initialize the first question
nextQuestion(0);
