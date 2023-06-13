// Javascript will be the main focus of the page.

// Quiz questions and answers
const quizQuestions = [
  {
    question: "Question 1: What  the HTML element do we use to put the JavaScript?",
    choices: ["<link>", "<script>", "<javascript>", "<div>"],
    correctAnswer: "<script>"
  },
  {
    question: "Question 2: Which of the following is not a valid JavaScript data type?",
    choices: ["Number", "String", "Application", "Boolean"],
    correctAnswer: "Application"
  },
  {
    question: "Question 3: What symbol is used for single line comments in JavaScript?",
    choices: ["//", "::", "@", "_"],
    correctAnswer: "//"
  },
];

// Other variables
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const saveBtn = document.getElementById("save-btn");
const timerEl = document.getElementById("time");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const gameOverEl = document.getElementById("game-over");
const initialsInput = document.getElementById("initials");
const scoreEl = document.getElementById("score");
let currentQuestionIndex = 0;
let timeLeft = 60;
let correctAnswers = 0;
let timerInterval;

// Event listeners
startBtn.addEventListener("click", startQuiz);

saveBtn.addEventListener("click", saveScore);

// Updates the timer
function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
    }
  }

// Starts the quiz
function startQuiz() {
  startBtn.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
  document.getElementById("quiz-container").style.display = "block";
}

// Shows the current question
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice) {
    const choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.addEventListener("click", checkAnswer);
    choicesEl.appendChild(choiceBtn);
  });
}

// Checks the selected answer
function checkAnswer(event) {
  const selectedChoice = event.target;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedAnswer = selectedChoice.textContent;

  if (selectedAnswer === currentQuestion.correctAnswer) {
    correctAnswers++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex === quizQuestions.length || timeLeft === 0) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// Ends the quiz
function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-container").style.display = "none";
  gameOverEl.style.display = "block";
  document.getElementById("score").textContent = correctAnswers;
  displayHighScores();
}

function  saveScore() {
  const initials = initialsInput.value.trim();
  if (initials === "") {
    errorEl.textContent = "Please enter your initials.";
    return;
  }

  // Save the score and initials 
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ initials, score:correctAnswers });
  localStorage.setItem("scores", JSON.stringify(scores));

  alert("Score saved!");
  initialsInput.value = "";
  

  displayHighScores();
}

// Display the high scores
function displayHighScores() {
  highScoresTable.innerHTML = "";

  // Retrieve the scores from storage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Sort the scores by highest score
  scores.sort((a, b) => b.score - a.score);

  // Display the scores in the table
  scores.forEach((score, index) => {
    const row = document.createElement("tr");
    const rankCell = document.createElement("td");
    const initialsCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    rankCell.textContent = index + 1;
    initialsCell.textContent = score.initials;
    scoreCell.textContent = score.score;
    row.appendChild(rankCell);
    row.appendChild(initialsCell);
    row.appendChild(scoreCell);
    highScoresTable.appendChild(row);
  });
}