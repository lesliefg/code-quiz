//================Declared Varibles================

//These are the button varibles
const highscores = document.querySelector("#highscores");
const studyBtn = document.querySelector("#study");
const startQuiz = document.querySelector("#starter-btn");
const quitQuiz = document.querySelector("#quit-btn");
const submitBtn = document.querySelector("#submit-btn");
const initialsSubmit = document.querySelector("#initialsSubmit");
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

//Quiz varibles
let questionCount = 0;
let playerScore = 0;

//Timer varibles
let timeEl = document.querySelector("#countdown");
let totalTime = 180;

//================Event Listeners================

//This makes it so the highscores button will show the highscores page and hide all other pages from any page
highscores.addEventListener("click", function() {
    greeterPage.setAttribute("style", "display: none;")
    StudyPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: none;")
    quizPage.setAttribute("style", "display: none;")
    scoresPage.setAttribute("style", "display: block;")
});

//This will open up the study resources page and hide all other pages 
studyBtn.addEventListener("click", function() {
    quizPage.setAttribute("style", "display: none;")
    greeterPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: none;")
    scoresPage.setAttribute("style", "display: none;")
    StudyPage.setAttribute("style", "display: block;")
});

//This will start the quiz and only accesible from the greeter page
startQuiz.addEventListener("click", function() {
    greeterPage.setAttribute("style", "display: none;");
    quizPage.setAttribute("style", "display: block;");
    setTime();
    showQuestion(0);
});

//this is the question submit button, accesible from any question page
submitBtn.addEventListener("click", function() {
     if(questionCount < questions.length - 1) {
        questionCount++;
        showQuestion(questionCount);
     }else{
        console.log("Questions all done!");
     }
});

//This is the quit quiz button, it will take you to the results page
quitQuiz.addEventListener("click", function() {
    quizPage.setAttribute("style", "display: none;")
    resultsPage.setAttribute("style", "display: block;")
});

//This is the start over button to restart the quiz
startOver.addEventListener("click", function() {
    resultsPage.setAttribute("style", "display: none;")
    greeterPage.setAttribute("style", "display: block;")
});

//This is the home button to get back to the greeter page from the study resources page
homeBtn.addEventListener("click", function() {
    StudyPage.setAttribute("style", "display: none;")
    greeterPage.setAttribute("style", "display: block;")
});

//This button takes you back to the greeter page from the highscores page
returnBtn.addEventListener("click", function() {
    scoresPage.setAttribute("style", "display: none;")
    greeterPage.setAttribute("style", "display: block;")
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
            quizPage.setAttribute("style", "display: none;")
            resultsPage.setAttribute("style", "display: block;")
        }
    }, 1000);
}

function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
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
];

function showQuestion(index) {
    const questionText = document.querySelector("#question");
    const answersList = document.querySelector("#answers");
    let questionTag = '<span>'+ questions[index].number + '. ' + questions[index].question + '</span>';
    let answersTag = '<button class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[0] +'</button>'
                        + '<button class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[1] +'</button>'
                        + '<button class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[2] +'</button>'
                        + '<button class="qst-btn" onClick="optionSelected(this)">'+ questions[index].choices[3] +'</button>';
    questionText.innerHTML = questionTag;
    answersList.innerHTML = answersTag;
}

function optionSelected(answer) {
    let selectedAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    // let allAns = answersList.children.length;
    if(selectedAns == correctAns) {
        // playerScore = PlayerScore + 10;
        console.log("Answer is correct")
        
    } else {
        totalTime = totalTime - 10;
        console.log("Answer is wrong");
    }

    // for (let i = 0; i < allAns; ii++) {
    //     answersList.children[i].classList.add("disabled");
    // }
}

//https://www.youtube.com/watch?v=WUBhpSRS_fk&ab_channel=CodingNepal tutorial 