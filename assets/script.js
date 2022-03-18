// variables for DOM elements
var highscoreBtn = document.querySelector(".highscore-btn");
var startScreen = document.querySelector(".start-screen");
var startButton = document.querySelector(".start-button");
var questionScreen = document.querySelector("#question-screen");
var timerElement = document.querySelector(".timer-count"); //include this in html somehow
var wordBlank = document.querySelector(".word-blank"); // include in html

var timerCount;
var winCounter = 0;
var timer; 
var isCorrect = false; 
var isWrong = false; 

// create a variable for our questions
var questions = [
    {
        name: "What does HTML stand for?",
        answers: ["Hot Topic Men's leggings", "Hyper Text Markup Language", "Hyper Text Made-Up Language", "Hyper Text Markup Lingo"],
        correct: "Hyper Text Markup Language",
    },
    {
        name: "Where is the correct place to insera JavaScript",
        answers: ["Body Section","Head Section", "Both body and head sections will work"],
        correct: "Body Section",
    },
    {
        name: "Inside which HTMl element do we put the JavaScript",
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
    }
];




var currentQuestion = 0; 
//create function to start quiz
function startQuiz() {
    console.log("starting quiz");
    //hide start screen 
    startScreen.setAttribute("class", "hide");
    highscoreBtn.setAttribute("class", "hide");
    // display first question

    timerCount = 75; 

    questionDisplay();
    startTimer();
}



// function startTimer(){
//     console.log("timer");
//     var timer = setInterval(function() {
//         timerCount--; 
//         timerElement.textContent = "Time Left: " + timerCount; 
//         if (timerCount >= 0 && isCorrect) {
//             rightAnswer();
//         }
//         if (isWrong) {
//             timerCount = timerCount - 5;
//             wordBlank.textContent = "Wrong!"
//         } 
//         if (timerCount === 0) {
//             clearInterval(timer);
//             gameOver();
//         }

//     }, 1000);
    
// }

// function rightAnswer() {
//     wordBlank.textContent = "Correct!"
//     winCounter++;
//     startButton.disabled = false; // necessary?

//     setWins();
// }

// setWins() {



// }

// create a function that displays questions
function questionDisplay() {
    console.log("hello");
    // create a template to inject questions into
    var template = `
        <h2> ${questions[currentQuestion].name} </h2>
        <button class= "answer-button" value= '${questions[currentQuestion].answers[0]}'> ${questions[currentQuestion].answers[0]} </button>
        <button class= "answer-button" value= '${questions[currentQuestion].answers[1]}'> ${questions[currentQuestion].answers[1]} </button>
        <button class= "answer-button" value= '${questions[currentQuestion].answers[2]}'> ${questions[currentQuestion].answers[2]} </button>
        <button class= "answer-button" value= '${questions[currentQuestion].answers[3]}'> ${questions[currentQuestion].answers[3]} </button>
    `
    // use inner html method to inject template into question div
    questionScreen.innerHTML = template;
}
// add function that checks users answers
// read the docs on the event interface

function checkAnswer(event) {
    console.log(event.target.innerText);
    // create variable for event.target.innerText to compare to right answer
    var choice = event.target;
    var answerChosen = event.target.value;

    if (!choice.classList.contains("answer-button")) {
        return;
    }
    if (answerChosen === questions.correct) {
        isCorrect = true; 
    }
    


    // if (answers[i] === correct){ 
    //     wordBlank.textContent = "you are Correct!";
    // }
    //increment currentQuestion by 1
    currentQuestion++;
    questionDisplay();
    
}
//attach event listener to start button
startButton.addEventListener("click", startQuiz);
// attach event listener to entire doc to check answers
document.addEventListener("click", checkAnswer);