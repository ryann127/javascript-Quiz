// variables for DOM elements
var highscoreBtn = document.querySelector(".highscore-btn");
var startScreen = document.querySelector(".start-screen");
var startButton = document.querySelector(".start-button");
var questionScreen = document.querySelector("#question-screen");
var timerElement = document.querySelector(".timer-count"); 
var wordBlank = document.querySelector("#word-blank"); 
var resetButton = document.querySelector(".reset-button");
var scoreElement = document.querySelector(".score");
var scoreScreen = document.querySelector("#last-screen")

var timerCount;
var scoreCounter = 0;
var timer; 
var isCorrect = false; 
var isWrong = false; 
var currentQuestion = 0; 
var score;

// create a variable for our questions
var questions = [
    {
        name: "What does HTML stand for?",
        answers: ["Hot Topic Mens leggings", "Hyper Text Markup Language", "Hyper Text Made-Up Language", "Hyper Text Markup Lingo"],
        correct: "Hyper Text Markup Language",
    },
    {
        name: "Where is the correct place to insert JavaScript",
        answers: ["Body Section","Head Section", "Both body and head sections will work", "Neither"],
        correct: "Body Section",
    },
    {
        name: "Inside which HTML element do we put the JavaScript",
        answers: ["scripting", "script", "js", "javascript"],
        correct: "js",
    },
    {
        name: "What is a method?",
        answers: ["a function within another function", "particular form of procedure", "type of acting", "a variable"],
        correct: "a function within another function",
    }, 
    {
        name: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: ["if i <> 5", "if (i<>5)", "if i=! 5 then", "if (i!=5)"],
        correct: "if (i!=5)",
    },
    {
        name: "What are the JavaScript data types?",
        answers: ["Number", "Boolean", "String", "all of the above"], 
        correct: "all of the above",
    },
    {
        name: "What is an undeclared variable?",
        answers: ["Variables that do not exist in a program", "Variables that are declared but with no value", "Non-existent", "Variable that returns and undefined value"],
        correct: "Variables that do not exist in a program",
    },
    {
        name: "Which is not looping structures in JavaScript?",
        answers: ["for", "while", "do-while", "given"],
        correct: "given",
    }
];


function init() {
    getWins();
};


//create function to start quiz
function startQuiz() {
    console.log("starting quiz");
    //hide start screen 
    startScreen.setAttribute("class", "hide");
    
    // display first question

    isWin = false; 

    timerCount = 75; 

    questionDisplay();
    startTimer();
}



function startTimer(){
    console.log("timer");
    
    var timer = setInterval(function() {
        timerCount--; 
        timerElement.textContent = "Time Left: " + timerCount; 
        if (timerCount >= 0 && isCorrect) {
            scoreCounter++;
            setWins();
        }
        if (isWrong && timerCount >=5) {
            timerCount = timerCount - 5;
        } 
        if (timerCount <= 0 || currentQuestion >= questions.length) {
            clearInterval(timer);
            gameOver();
        }

    }, 1000);
    
};

function setWins() {
    scoreElement.textContent = scoreCounter;

    localStorage.setItem('scoreCount', scoreCounter);

};

function getWins() {

  var storedScore = localStorage.getItem("scoreCount"); 
  if (storedScore === null) {
    scoreCounter = 0;
  } else {
    scoreCounter = storedScore;
  }
  scoreElement.textContent = storedScore;

};

function gameOver() {

    document.getElementById("last-screen").classList.remove('hide');
    scoreScreen.setAttribute("class", "column");
    questionScreen.setAttribute("class", "hide");
    timerElement.textContent= (" ");

    wordBlank.textContent = "Game Over!";


};
    
// create a function that displays questions
function questionDisplay() {

    
    // create a template to inject questions into
    var template = `
        <h2> ${questions[currentQuestion].name} </h2>
        <button id="first-button" class="answer-button" value='${questions[currentQuestion].answers[0]}'> ${questions[currentQuestion].answers[0]} </button>
        <button class="answer-button" value='${questions[currentQuestion].answers[1]}'> ${questions[currentQuestion].answers[1]} </button>
        <button class="answer-button" value='${questions[currentQuestion].answers[2]}'> ${questions[currentQuestion].answers[2]} </button>
        <button class="answer-button" value='${questions[currentQuestion].answers[3]}'> ${questions[currentQuestion].answers[3]} </button>
    `
    // use inner html method to inject template into question div
    questionScreen.innerHTML = template;
}
// add function that checks users answers
// read the docs on the event interface

function checkAnswer(event) {
    event.preventDefault();
    // console.log(event.target.innerText);
    // create variable for event.target.innerText to compare to right answer
    var choice = event.target;
    var answerChosen = event.target.value;
    console.log(answerChosen);

    if (!choice.classList.contains("answer-button")) {
        return;
    }

    if (answerChosen === questions[currentQuestion].correct) {
        isCorrect = true; 
        wordBlank.textContent = "Correct!";
    } else {
        isWrong = true; 
        wordBlank.textContent = "Wrong!";
    };

   

    //increment currentQuestion by 1
    currentQuestion++;
    questionDisplay();
    
    
}
//attach event listener to start button
startButton.addEventListener("click", startQuiz);
// attach event listener to entire doc to check answers
document.addEventListener("click", checkAnswer);
// attach event listener to reset highscore
resetButton.addEventListener("click", scoreCounter=0, startQuiz);
resetButton.addEventListener("click", startQuiz);
scoreScreen.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form has been submitted");
});