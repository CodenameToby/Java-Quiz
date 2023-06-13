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
let timerInterval;

// Event listeners
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitAnswer);
saveBtn.addEventListener("click", saveScore);

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
    choicesEl.appendChild(choiceBtn);
  });
}

// Updates the timer
function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
}

// Submits users answer
function submitAnswer() {
  
}