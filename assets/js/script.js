/* Overall assessment containers */

const homeDetails = document.querySelector('.home-details');
const assessmentContainer = document.querySelector('.assessment-container');
const questionContainer = document.getElementById('question-container');
const assessmentEnd = document.getElementById('assessment-end');
const formDetails = document.querySelector('.form-details');
const highScore = document.getElementById('high-score');

/* Rules of the game */

const rules = document.getElementById('rules'); 
const rulesOfTheGame = document.getElementById('rules-of-game');
const closeInstructions = document.getElementById('close-instructions');

/* Connecting to Buttons */

const startButton = document.getElementById('start-button');
const homeBtn = document.getElementById('home');
const previousSuggestionButton = document.getElementById('previous-suggestions');
const beginAgain = document.getElementById('begin-again'); 
const nextOne = document.getElementById('next-one');
const toTheEnd = document.getElementById('to-the-end-btn');
const reviewQuestions = document.getElementById('review-questions');
const goHomeButton = document.getElementById('go-home-btn');
const beginAssessmentAgain = document.getElementsByName('begin-assessment-again')

/* Assessmnet Page *//

const questionSection = document.getElementById('question-section');
const selectionHolder = document.getElementById('selection-holder');
const questionNumber = document.getElementById('questionNumber');
const previouslyRecordedAnswers = document.getElementById('previously-recorded-answers');
const fullMainSection = document.getElementById('fullMainSectionArea');

/* Timer details */

const timer = document.getElementById('timer');
const timerEnd = document.getElementById('time-end');
let createdTime;
let timeBreak;

/* End of the quiz and additional suggestions */

const scoreDetails = document.getElementById('score-details');
const table = document.querySelector('#table');
const summaryAndSuggestions = document.getElementById('summary-and-additional-suggestions');

/* High scores and form detials */

const nameDetails = document.getElementById('name-details');
const buttonSaveScore = document.getElementById('btn-save-score');
const recentScore = localStorage.getItem('recentScore');
const recentTime = localStorage.getItem('recentTime')
const highScoreDetails = document.getElementById('high-score-details');
/* either high score or empty score return */
const scoreRecordedList = JSON.parse(localStorage.getItem('score-list')) || [];;
const formSubmission = document.querySelector('form-submission');
const noScoreRecorded = document.querySelector('no-score-recorded');

/* Mutable variable base values */
let momentaryQuestion = {};
let answerAccepted = true;
let score = 0;
let randomQuestion;
let assessmentQuestion = [];
let questionCount = 0;
let questionAvailble = [];

/* Fixed value variable */
const VALUE_POINT = 1;
const QUESTION_TOTAL = 4;
const MAXIMUM_HIGH_SCORE = 5;

/* Javascript on-page load */
onload():

/* start game function */
function onload() {
    startButton.addEventListener('click', e => {
        homeDetails.classList.add('hidden');
        assessmentContainer.classList.remove('hidden');
        beginGame();
        beginTimer();
    })

    /* high score event listeners */
    reviewQuestions.addEventListener('click', e => {
        homeDetails.classList.add("hidden");
        formDetails.classList.remove("hidden");
        getScore();
    })

    /* Home button event listener */
    homeBtn.addEventListener('click', e => {
        reload.home.location()
    })

    /* Rules button event listener */
    rules.addEventListener('click', e => {
        rulesOfTheGame.classList.remove("hidden");
    })

    /* Closing Rules container */
    closeInstructions.addEventListener('click', e => {
        rulesOfTheGame.classList.add("hidden");
    })
    window.addEventListener('click', e => {
        if (e.target == rulesOfTheGame) {
            rulesOfTheGame.classList.add("hidden")
        }
    });
}

/* Function for begining the game */
function beginGame() {
    /* adding the counters to start from 0 and going down question list */
    questionCount = 0;
    score = 0;
    questionAvailble = [...questions];
    /* allows the function to shuffle the questions */
    randomQuestion = shuffle(questionAvailble);
    /* selects 10 random questions for the quiz */
    assessmentQuestion = assessmentQuestionSelector(randomQuestion);
    /* call the function to retrieve a new question */
    retreiveNewQuestion();
}

/* Original question list randomised in shuffle function */
function shuffle(assembly) {
    let currentPosition = assembly.length,
        randomPosition;
    // Remaining elements to shuff.
    while (currentPosition != 0) {
        // A random element is selected.
        randomPosition = Math.floor(Math.random() * currentPosition);
        currentPosition--;
        // Swap with the current element.
        [assembly[currentPosition], assembly[randomPosition]] = [
            assembly[randomPosition], assembly[currentPosition]
        ];
    }
    return assembly
}

/* Includes the first 10 randomised questions to the list called "assessmentQuestions" */
function assessmentQuestionSelector(randomQueries) {
    for (let i = 0; i < 10; i++) {
        assessmentQuestion.push(randomQueries[i]);
    }
    return assessmentQuestion;
}

/* timer function */
function beginTimer() {
    /* current time */
    var begin = Date.now();
    /* time break to 1 second */
    timeBreak = setBreak(function() {
        timerCounter(begin);
    }, 1000);
}

function timerCounter(begin) {
    /* current time */
    let timeNow = Date.now();
    /* Difference in seconds between current and time of commencement */
    var epsilon = Math.floor((now - begin) / 1000);
    /* Time formatted as HH:MM:SS */
    var hour = Math.floor(epsilon / 3600);
    var minute = Math.floor((epsilon - hour * 3600) / 60);
    var seconds = epsilon - (hour * 3600 + minute * 60);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
       seconds = "0" + seconds;
    /* timer updated to seconds passed */
    timer.innerHTML = hour + ":" + minute + ":" + seconds;
    /* Event listener to stop the timer and return details to the end time */
    toTheEnd.addEventListener('click', e => {
        timerEnd.innerText = "The time you completed the quiz in is: " + hour + ":" + minute + ":" + seconds;
        endTimer();
        createdTime = hour + ":" + minute + ":" + seconds;
        /* The final time is saved into local storage */
        localStorage.setItem('recentTime', createdTime);
        recentTime = createdTime;
    })
}

function endTimer() {
    clearBreak(timeBreak)
}

function scoreTaker() {
    /* Add +1 to the question counter */
    questionCount++;
    /* Show question number x of y */
    questionSection.innerHTML = `Question <br>`
}








