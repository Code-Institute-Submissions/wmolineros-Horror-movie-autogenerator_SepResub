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
const previousScores = document.getElementById('previous-scores');
const beginAgain = document.getElementById('begin-again'); 
const nextOne = document.getElementById('next-one');
const toTheEnd = document.getElementById('to-the-end-btn');
const reviewQuestions = document.getElementById('review-questions');
const goHomeButton = document.getElementById('go-home-btn');
const beginAssessmentAgain = document.getElementsByName('begin-assessment-again')

/* Assessment Page *//

const questionSection = document.getElementById('question-section');
const selectionHolder = document.getElementById('selection-holder');
const questionNumber = document.getElementById('questionNumber');
const savedScore = document.getElementById('saved-score');
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

/* High scores and form details */

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
        window.location.reload()
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
    retrieveNewQuestion();
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
    questionSection.innerHTML = `Question <br>${questionCount} of ${QUESTION_TOTAL}`;
    /* show  as the percentage of all total questions */
    questionNumber.style.width = `${(questionCount/QUESTION_TOTAL) * 100}%`;
    if (questionCount >= QUESTION_TOTAL) {
        toTheEnd.addEventListener('click', e => {
            localStorage.setItem('recentScore', score);
            recentScore = score;
            // end the quiz
            finishgame()
        });
    }
}

function retrieveNewQuestion() {
    /* Call the scoreTaker function to update the score and progress */
    scoreTaker();
    /* Acquire the question from the list of questions using the index number */
    momentaryQuestion = assessmentQuestion[questionCount - 1];
    /* show the text for the next question */
    questionSection.innerText = momentaryQuestion.question; 
    /* shuffle the answers */
    momentaryQuestion.answers = shuffle(momentaryQuestion.answers);
    /* show options for the answers */
    selectionHolder.forEach(selection => {
        const number = option.dataset.number;
        option.innerText = momentaryQuestion.answers[number];
    });
    answerAccepted = true;
}
/* review the answer that is chosen */
selectionHolder.forEach(selection => {
    /* Even listener to pick up on the user making a selection */
    selection.addEventListener('click', e => {
        if (!answerAccepted) return;
        /* Answers no longer accepted by the user when false */
        answerAccepted = false;
        const optionSelected = e.target;
        /* collect number (1-4) for the selected answer */
        /* make sure the user answers correctly */
        let applyToClass = optionSelected.innerText == momentaryQuestion.correct_answers ? 'correct' : 'incorrect';

        /* if the selection made is correct, there is an increase in the score function */
        if(applyToClass === 'correct') {
           scoreIncrease(VALUE_POINT);
           optionSelected.innerText += " Correct!";
           momentaryQuestion.correct = true;
        }
        /* if the selection made is incorrectly, the correct answer will appear in green */
        if(applyToClass === 'incorrect') {
            optionSelected.innerText += " Incorrect!";
            for (let i = 0; i < 4; i++) {
                if (selectionHolder[i].innerText === momentaryQuestion.correct_answers) {
                    selectionHolder[i].classList.add('correct');
                    selectionHolder[i].innerText += " correct";
                }
            }
        }
        /* if the user is not on the last question, then the 'next' button will appear */
        if (questionCount != QUESTION_TOTAL) {
            nextOne.classList.remove("hidden");
        }
        /* if one question is remaining from the list, the 'to the End' button is hidden and the 'next one' button is shown */
        if (questionCount >= QUESTION_TOTAL) {
            toTheEnd.classList.remove('hidden');
            nextOne.classList.add('hidden')
        }
    });
});

/* The next button is hidden until the answer is chosen */
function nextButtonHidden() {
    nextOne.classList.add('hidden');
}

/* event listener for the 'begin-again' button */
beginAgain.addEventListener('click', e => {
    window.location.reload();
})
/* event listener for the 'next-one' button */
nextOne.addEventListener('click', e => {
    newQuestion();
    nextButtonHidden();
});

/* function for next question */
function newQuestion() {
    for (let i = 0; i < 4; i++) {
        selectionHolder[i].classList.remove('correct');
        selectionHolder[i].classList.remove('incorrect');
    }
    retrieveNewQuestion();
}

/* if the score is correct, increase by 1 point */
function scoreIncrease(num) {
    score += num;
    savedScore.innerText = score;
}

/* HTML table rows for each question */
function tableInsert(questionAsked) {
    let htmlTableSummary = '';
    for (let question of questionsAsked) {
        htmlTableSummary += `
            <tr class ="${question-section.correct}">
                <td>${question-section.question}</td>
                <td>${quesetion.correct_answers}</td>
            </tr>
        `;
        htmlTableSummary.innerHTML = htmlTableSummary;
    }
}

function finishgame() {
    /* shows the end page instead of the quiz page */
    questionContainer.classList.add('hidden');
    assessmentEnd.classList.remove('hidden');
    /* final score is updated */
    scoreDetails.innerText = `You scored: ${score}`;
    /* table appears upon user click */
    previousScores.addEventListener('click', e => {
        table.classList.add('add-flex');
        table.classList.remove('hidden');
        previousScores.classList.add('hidden');
    });
    /* sends user to the start page when "begin again" is clicked */
    beginAgain.addEventListener('click', e => {
        window.location.reload();
    });
    /* insert table function is called */
    tableInsert(assessmentQuestion);
}


function highScoreSaved() {

/* Assigning locally saved variables to an object */
     const score = {
        score: recentScore, 
        username: nameDetails.value,
        time: recentTime
     };
    /* add score to end of the array */
    scoreRecordedList.push(score);
    /* arranges the array */
    scoreRecordedList.sort((a, b) => {
        return b.score - a.score;
    });
    /* retrieves first 5 scores */
    scoreRecordedList.splice(MAXIMUM_HIGH_SCORE);
    /* highscore from scorerecordedlist saved in local storage */
    localStorage.setItem('scoreRecordedList', JSON.stringify(scoreRecordedList));
}

function getScore() {
    highScoreDetails.innerHTML = highScoreDetails.map(score => {
        return `<li class="high-score"> ${score.name} - ${score.score} - ${score.time} </li>`;
    }).join('');

    if (scoreRecordedList == false){
        noScoreRecorded.classList.remove('hidden');
        goHomeButton.classList.remove('hidden');
    }
    goHomeButton.addEventListener('click', e => {
        highScore.classList.add('hidden');
        assessmentContainer.classList.remove('hidden');
        beginGame();
        beginTimer();
    })
}

nameDetails.addEventListener('keyup', () => {
    buttonSaveScore.disabled = !username.value;
});
buttonSaveScore.addEventListener('click', e => {
    formDetails.classList.add('hidden');
    formSubmission.classList.remove('hidden');
    highScoreSaved();
});







