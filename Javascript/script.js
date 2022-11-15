//================Declared Varibles================

//These are the button varibles
const startQuiz = document.querySelector("#starter-btn");
const highscores = document.querySelector("#highscores");
const studyBtn = document.querySelector("#study");
const quitQuiz = document.querySelector("#quit-btn");
const nextBtn = document.querySelector("#next-btn");
const initialsSubmit = document.querySelector("#submit");
const startOver = document.querySelector("#startOver");
const homeBtn = document.querySelector("#home-btn");
const clearScores = document.querySelector("#clear-btn");
const returnBtn = document.querySelector("#return-btn");

//These are the page varibles 
const greeterPage = document.querySelector("#greeter");
const quizPage = document.querySelector("#quiz");
const resultsPage = document.querySelector("#results");
const scoresPage = document.querySelector("#scores");
const StudyPage = document.querySelector("#study-help");

//Misc varibles
const answersList = document.querySelector(".answers_list");
var initialsInput = document.querySelector("#initials");
let scoreEl = document.querySelector("#score");
let questionCount = 0;
let playerScore = 50;
var finalScore = [];

//Timer varibles
let timeEl = document.querySelector("#countdown");
let totalTime = 100;

//Highscore varibles
var table = document.getElementById('scores-list');


//================Event Listeners================

//This makes it so the highscores button will show the highscores page and hide all other pages from any page
//This will start the quiz and only accesible from the greeter page
startQuiz.addEventListener("click", function() {
    greeterPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: block;");
    setTime();
    showQuestion(0);
});

highscores.addEventListener("click", function() {
    greeterPage.setAttribute("style", "display: none;");
    StudyPage.setAttribute("style", "display: none;");
    resultsPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: none;");
    scoresPage.setAttribute("style", "display: block;");
});

//This will open up the study resources page and hide all other pages 
studyBtn.addEventListener("click", function() {
    quizPage.setAttribute("style", "display: none;");
    greeterPage.setAttribute("style", "display: none;");
    resultsPage.setAttribute("style", "display: none;");
    scoresPage.setAttribute("style", "display: none;");
    StudyPage.setAttribute("style", "display: block;");
});

//this is the question submit button, accesible from any question page
nextBtn.addEventListener("click", function() {
     if(questionCount < questions.length - 1) {
        questionCount++;
        showQuestion(questionCount);
     }else{
        console.log("Questions all done!");
        showResults();
     }
});

//This is the quit quiz button, it will take you to the results page
quitQuiz.addEventListener("click", function() {
    quizPage.setAttribute("style", "display: none;");
    resultsPage.setAttribute("style", "display: block;");
    quitPenalty();
});

initialsSubmit.addEventListener("click", function() {
    saveInfo();
});

//This is the start over button to restart the quiz
startOver.addEventListener("click", function() {
    resultsPage.setAttribute("style", "display: none;");
    greeterPage.setAttribute("style", "display: block;");
    reset();
});

//This is the home button to get back to the greeter page from the study resources page
homeBtn.addEventListener("click", function() {
    StudyPage.setAttribute("style", "display: none;");
    greeterPage.setAttribute("style", "display: block;");
});

//This button takes you back to the greeter page from the highscores page
returnBtn.addEventListener("click", function() {
    scoresPage.setAttribute("style", "display: none;");
    greeterPage.setAttribute("style", "display: block;");
});

//This button function clears the local storage
clearScores.addEventListener("click", function() {
    localStorage.clear();
});


//================Timer Function================
function setTime() {
    var timerInterval = setInterval(function() {
        totalTime--;
        timeEl.textContent = totalTime + "s";

        if(totalTime === 0) {
            clearInterval(timerInterval);
            gameOver();
            quizPage.setAttribute("style", "display: none;")
            resultsPage.setAttribute("style", "display: block;")
        }
    }, 1000);
}

function reset() {
    totalTime = 100;
    timeEl.textContent = 0;
    playerScore = 50;
    questionCount = 0;
}

//================Varibles for questions================
let questions = [
    {
        number: "1",
        question: "Which is an INVALID way to declare a varible?",
        choices: ["1. var", "2. let", "3. const", "4. declared"],
        answer: "4. declared"
    },
    {
        number: "2",
        question: "Where is the correct place to insert JavaScript in HTML?",
        choices: ["1. Before the body tag", "2. Inside the body tag", "3. After the /body tag", "4. After /html tag"],
        answer: "2. Inside the body tag"
    },
    {
        number: "3",
        question: "What is used to enclose strings within an assigned varible?",
        choices: ["1. Curly brackets", "2. Parenthesis", "3. Quotation Marks", "4. Square brackets"],
        answer: "3. Quotation Marks"
    },
    {
        number: "4",
        question: "What is the first index of an array?",
        choices: ["1. Zero (0)", "2. One (1)", "3. Two (2)", "4. It can be anything you want"],
        answer: "1. Zero (0)"
    },
    {
        number: "5",
        question: "How do you indicate comments in JavaScript?",
        choices: ["1. ! --Using these brackets--", "2. /*Using this before comments", "3. //Using this before comments", "4. ## Using this before comments"],
        answer: "3. //Using this before comments"
    },
    {
        number: "6",
        question: "Which one is NOT a commonly used data type?",
        choices: ["1. Alerts", "2. Booleans", "3. Strings", "4. Number"],
        answer: "1. Alerts"
    },
    {
        number: "7",
        question: "Which of the following is index number 4? <br> var words = ['hello', 'world', 'welcome', 'to my', 'quiz']",
        choices: ["1. 'hello'", "2. 'welcome'", "3. 'to my'", "4. 'quiz'"],
        answer: "4. 'quiz'"
    },
    {
        number: "8",
        question: "Which of the following will cause an alert box to pop up?",
        choices: ["1. message()", "2. return()", "3. alert()", "4. alertBox()"],
        answer: "3. alert()"
    },
    {
        number: "9",
        question: "What do we use to enclose an if/else statement?",
        choices: ["1. curly brackets {}", "2. Parenthesis ()", "3. Square brackets []", "4. None of the above"],
        answer: "1. curly brackets {}"
    },
    {
        number: "10",
        question: "What is console.log useful for?",
        choices: ["1. Creating popups", "2. Storing local responses", "3. Executing commands", "4. Debugging"],
        answer: "4. Debugging"
    },
];


//================Functions================

function showQuestion(index) {
    const questionText = document.querySelector("#question");
    let questionTag = '<span>'+ questions[index].number + '. ' + questions[index].question + '</span>';
    let answersTag = '<p id="answerbutton" class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[0] +'</p>'
                        + '<p id="answerbutton" class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[1] +'</p>'
                        + '<p id="answerbutton" class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[2] +'</p>'
                        + '<p id="answerbutton" class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[3] +'</p>';
    questionText.innerHTML = questionTag;
    answersList.innerHTML = answersTag;
}

function optionSelected(answer) {
    let selectedAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allAnswers = answersList.children.length;
    if(selectedAns == correctAns) {
        answer.classList.add("correct");
        playerScore = playerScore + 5;
        console.log("Answer is correct");
        console.log(playerScore);
        
    } else {
        answer.classList.add("wrong");
        totalTime = totalTime - 10;
        console.log("Answer is wrong");
        console.log(playerScore);
    }

    for (let i = 0; i < allAnswers; i++) {
        answersList.children[i].classList.add("disabled");
    }
}

function showResults() {
    quizPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: block;")
}

function gameOver() {
    quizPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: block;")
    playerScore = playerScore - 50;
    finalScore.textContent = "Your final score is :" + playerScore;
}

function quitPenalty() {
    playerScore = playerScore - 50;
    console.log(playerScore);
}

//test area
function saveInfo() {
    var initialsInput = document.querySelector("#initials");
    localStorage.setItem("initialinput", initialsInput.value);

    window.localStorage.getItem(playerScore);
// }

// function saveInfo() {
//     var playerInit = initialsInput.value;
//     scoreList.push({ initials: playerInit, score: playerScore });

//     // var roundInfo = {
//     //     initials: initialsInput.value,
//     //     score: playerScore
//     // }
//     window.localStorage.setItem("roundInfo", JSON.stringify(roundInfo));
}

// function shoppingListSubmit(event) {
//     event.preventDefault();
//     let shoppingInputValue = $('#shopping-input').val();
//     shoppingListEl.append('<li>' + shoppingInputValue);
//     $('input[type="text"]').val('');
// }


//Acceptance Criteria
//GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
