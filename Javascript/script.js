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

//Timer varibles
let timeEl = document.querySelector("#countdown");
let totalTime = 100;

//Highscore varibles
var scoresList = document.querySelector('#scores-list');


//================Event Listeners================

// This will start the quiz and only accesible from the greeter page
startQuiz.addEventListener("click", function() {
    greeterPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: block;");
    setTime();
    showQuestion(0);
});

//This makes it so the highscores button will show the highscores page and hide all other pages from any page
highscores.addEventListener("click", function() {
    greeterPage.setAttribute("style", "display: none;");
    StudyPage.setAttribute("style", "display: none;");
    resultsPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: none;");
    scoresPage.setAttribute("style", "display: block;");
    showScores();
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
    //The if makes the questions progress as you hit next. The else takes you to the results page after you've gone through all 10 questions
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
//This is the submit button event listener. It submits the score and inital and clears the input box after submit is hit
initialsSubmit.addEventListener("click", function() {
    resultsPage.setAttribute("style", "display: none;");
    scoresPage.setAttribute("style", "display: block;");
    saveScore();
    showScores();
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
    showScores();
});


//================Timer Function================
function setTime() {
    var timerInterval = setInterval(function() {
        totalTime--;
        //This part sets the time text to the total time left plus an s at the end
        timeEl.textContent = totalTime + "s";
        //This is the if function for when the timer hits 0. It clears the interval and jumps to the quiz over screen
        if(totalTime === 0) {
            clearInterval(timerInterval);
            guizOver();
            quizPage.setAttribute("style", "display: none;")
            resultsPage.setAttribute("style", "display: block;")
        }
    }, 1000);
}
//This function resets the time, time text, player score and question count whenever the results page is loaded
function reset() {
    totalTime = 100;
    timeEl.textContent = 0;
    playerScore = 50;
    questionCount = 0;
}

//================Varibles for questions================
//This varible defines all the questions, choices and the correct answer
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
//This function shows our quiz questions and also inserts the choice buttons into the HTML for you to select. 
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
//This function checks the options selected and whether they are right or wrong
function optionSelected(answer) {
    let selectedAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allAnswers = answersList.children.length;
    //This part will highlight your choice green if it was right and will add 5 points to your total score
    if(selectedAns == correctAns) {
        answer.classList.add("correct");
        playerScore = playerScore + 5;
        console.log("Answer is correct");
        console.log(playerScore);
    //This part will deduct 10 seconds from the timer and add a class to the choice you picked to highlight it red if the answer is wrong
    } else {
        answer.classList.add("wrong");
        totalTime = totalTime - 10;
        console.log("Answer is wrong");
        console.log(playerScore);
    }
    //This part of the function will disable the other three buttons after you've selected one of the four choices
    for (let i = 0; i < allAnswers; i++) {
        answersList.children[i].classList.add("disabled");
    }
}
//This function will display the results page and the player score on the results page
function showResults() {
    quizPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: block;")
    scoreEl.textContent = "Your final score is: " + playerScore ;
}
//This function will deduct 50 points if the timer hits zero 
function quizOver() {
    quizPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: block;")
    playerScore = playerScore - 50;
    scoreEl.textContent = "Your final score is: " + playerScore ;
}
//This function will deduct 50 points if the player decides to quit the game
function quitPenalty() {
    playerScore = playerScore - 50;
    console.log(playerScore);
    scoreEl.textContent = "Your final score is: " + playerScore ;
}
//The following three functions work together to add and save the players score and initials to the score list array
function getScore () {
    var highscoresList = localStorage.getItem("ScoreList");
    if (highscoresList !== null ){
        newList = JSON.parse(highscoresList);
        return newList;
    } else {
        newList = [];
    }
};
//This function will add our information from saveScore to the local storage for getScore to push into an array list
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};
//This function will save our score and initials with the submit button click
function saveScore () {
    var roundInfo ={
        initials: initialsInput.value,
        score: playerScore
    }
    addItem(roundInfo);
}

//This function will display our scores list on the Highscores page
function showScores () {
    scoresList.innerHTML = "";
    var highScores = sortScores();   
    //This will slice our scores array to only show 10 scores if more than 10 are submitted
    var topScores = highScores.slice(0,10);
    //This will increase the data indez by 1 for each list item
    for (var i = 0; i < topScores.length; i++) {
        var item = topScores[i];
    //This will add the list items for every score submitted
    var li = document.createElement("li");
    li.textContent = item.initials + " ............. " + item.score;
    li.setAttribute("data-index", i);
    scoresList.appendChild(li);
    //This will add the class name for styling/placement
    scoresList.classList.add("individualScores");
    }
};

//This will sort our scores for us to insert into the highscores page
function sortScores () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};


//==================Acceptance Criteria===================
//GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question     -Done
// WHEN I answer a question
// THEN I am presented with another question                  -Done
// WHEN I answer a question incorrectl
// THEN time is subtracted from the clock                     -Done
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over                                      -Done
// WHEN the game is over
// THEN I can save my initials and score                      -Done
// WHEN I click the highscores page
// THEN I see a list of my previous submitted scores          -DONE FINALLY UGH THIS ONE TOOK FOREVER to figure out!!! At least 30 hours TT-TT
