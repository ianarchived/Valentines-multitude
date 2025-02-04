const questions = [
    { 
        text: "Hiii Honeyy!!! 💕", 
        answers: ["Hiii !!!!"] 
    },
    { 
        text: "I’m glad you took the time off your day to open this website :DDD", 
        answers: ["Of course !!!"] 
    },
    { 
        text: "As you know, there’s a specific day coming up!", 
        answers: ["Mhmm !!!"] 
    },
    { 
        text: "And you, being the one that I love most, I just want to ask you something very important!", 
        answers: ["What is it :ooo"] 
    },
    { 
        text: "Will you Be My Valentine? 💖", 
        answers: ["Yes 😍", "No 😔"], 
        special: true // This question has a Yes/No effect
    },
    { 
        text: "YIPPEEEEE!!! 🎉 I made a special gift for you!", 
        answers: ["🎁 Open Your Gift! 🎁"], 
        link: "YOUR_LINK_HERE" 
    }
];

let currentQuestion = 0;
let noButtonPressCount = 0;

function nextQuestion(index) {
    if (index >= questions.length) return;

    currentQuestion = index;
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");

    // Update the question
    questionText.innerText = questions[index].text;

    // Clear old buttons
    answerButtons.innerHTML = "";

    // Add new buttons
    questions[index].answers.forEach((answer) => {
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = answer;
        if (questions[index].special) {
            button.onclick = answer === "Yes 😍" ? () => selectOption("yes") : () => selectOption("no");
        } else if (questions[index].link) {
            button.onclick = () => window.location.href = questions[index].link;
        } else {
            button.onclick = () => nextQuestion(index + 1);
        }
        answerButtons.appendChild(button);
    });
}

function selectOption(option) {
    let questionDiv = document.getElementById('question-container');
    let yesButton = document.querySelector(".btn:first-child");
    let noButton = document.querySelector(".btn:last-child");

    if (option === 'yes') {
        flashRainbowColors(() => {
            questionDiv.style.display = 'none';
            displayCatHeart();
            nextQuestion(5);
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
        document.getElementById('question-container').style.display = 'none';
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
