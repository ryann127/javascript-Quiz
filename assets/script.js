// variables for DOM elements
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var questionScreen = document.querySelector("#question-screen");

// create a variable for our questions
var questions = [
    {
        name: "what does html stand for?",
        answers: ["hot topic men leggings", "hyper text markup language", "hyper text made-up language", "hyper text markup lingo"],
        correct: "hyper text markup language",
    },
    {
        name: "what is the correct number?",
        answers: ["1","2", "3", "4"],
        correct: "1",
    },
];
var currentQuestion = 0; 
//create function to start quiz
function startQuiz() {
    console.log("starting quiz");
    //hide start screen 
    startScreen.setAttribute("class", "hide");
    // display first question
    questionDisplay();
}

// create a function that displays questions
function questionDisplay() {
    console.log("hello");
    // create a template to inject questions into
    var template = `
        <h2> ${questions[currentQuestion].name} </h2>
        <button class= "answer-button"> ${questions[currentQuestion].answers[0]} </button>
        <button class= "answer-button"> ${questions[currentQuestion].answers[1]} </button>
        <button class= "answer-button"> ${questions[currentQuestion].answers[2]} </button>
        <button class= "answer-button"> ${questions[currentQuestion].answers[3]} </button>
      
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

    if (!choice.classList.contains("answer-button")) {
        return;
    }

    //increment currentQuestion by 1
    currentQuestion++;
    questionDisplay();
    
}
//attach event listener to start button
startButton.addEventListener("click", startQuiz);
// attach event listener to entire doc to check answers
document.addEventListener("click", checkAnswer);