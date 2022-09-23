/* Overall assessment containers */

const homeDetails = document.querySelector('.home-details');
const assessmentContainer = document.querySelector('.assessment-container');
const questionContainer = document.getElementById('question-container');
const assessmentEnd = document.getElementById('assessment-end');
const formDetails = document.querySelector('.form-details');
const previousRecordContainer = document.getElementById('previous-record-container');

/* Rules of the game */

const rules = document.getElementById('rules');
const rulesOfTheGame = document.getElementById('rules-of-game');
const details = document.getElementById('details');

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

const assessmentDetails = document.getElementById('assessment-details');
const table = document.querySelector('#table');
const summaryAndSuggestions = document.getElementById('summary-and-additional-suggestions');

/* Form detials */

const nameDetails = document.getElementById('name-details');
const additionalDetails = document.getElementById('show-additional-details');
const mostRecentSuggestion = localStorage.getItem('mostRecentSuggestion');
const suggestionsRecordedList = JSON.parse(localStorage.getItem('suggestions-list')) || [];;
const formSubmission = document.querySelector('form-submission');
const noDetailsRecorded = document.querySelector('no-details-recorded');

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
        assessmentContainer.classList.remove(hidden);
        beginGame();
        beginTimer();
    })

    /* high score event listeners */
    
}












