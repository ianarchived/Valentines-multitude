// script.js

let currentQuestion = 0;
let noButtonPressCount = 0;

function nextQuestion() {
    let questions = document.querySelectorAll('.question');
    if (currentQuestion < questions.length - 1) {
        questions[currentQuestion].style.display = "none";
        currentQuestion++;
        questions[currentQuestion].style.display = "block";
    }
}

function selectOption(option) {
    let questionDiv = document.getElementById('question');
    let yesButton = document.getElementById('yes-button');
    let noButton = document.getElementById('no-button');

    if (option === 'yes') {
        flashRainbowColors(() => {
            questionDiv.style.display = 'none';
            displayCatHeart();
        });
    } else if (option === 'no') {
        noButtonPressCount++;
        
        let currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        let newSize = parseFloat(currentFontSize) * 1.2;
        yesButton.style.fontSize = newSize + 'px';

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

function flashRainbowColors(callback) {
    let colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    let i = 0;
    let interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = '#ffe6f2';
        callback();
    }, 2000);
}

function displayCatHeart() {
    document.getElementById('image-container').innerHTML = '';
    let imageContainer = document.getElementById('image-container');
    let catHeartImage = new Image();
    catHeartImage.src = 'cat-heart.gif'; 
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.onload = () => {
        imageContainer.appendChild(catHeartImage);
        document.getElementById('options').style.display = 'none';
        nextQuestion();
    };
}

function moveButtonToRandomPosition(button) {
    let maxX = window.innerWidth - button.clientWidth - 50;
    let maxY = window.innerHeight - button.clientHeight - 50;
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}
