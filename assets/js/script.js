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
const endTimer = document.getElementById('time-end');
let createdTime;
let timeInterval;

/* End of the quiz and additional suggestions */

const scoreDetails = document.getElementById('score-details');
const table = document.querySelector('#table');
const summaryAndSuggestions = document.getElementById('summary-and-additional-suggestions');

/* Form detials */

const nameDetails = document.getElementById('name-details');
const highScoreDetails = document.getElementById('high-score-details');
const recentScore = localStorage.getItem('RecentScore');
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












