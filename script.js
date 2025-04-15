const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Rome", "Berlin"],
    correct: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheets", "Colorful Style System", "Creative Style Syntax", "Computer Style Sheet"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which animal is known as the 'Ship of the Desert",
    answers: ["Cow", "Camel", "Lion", "Cat"],
    correct: "Camel"
  },
  {
    question: "Which is the smallest month of the year?",
    answers: ["January", "December", "February", "April"],
    correct: "February"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = "";
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function showQuestion() {
  clearInterval(timer); // stop any previous timer
  timeLeft = 15;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);

  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  selectedAnswer = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => {
      selectedAnswer = answer;
      document.querySelectorAll("#answers button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    answersEl.appendChild(btn);
  });
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = `Time left: ${timeLeft}s`;

  if (timeLeft === 0) {
    clearInterval(timer);
    nextBtn.click(); // Auto proceed when time runs out
  }
}

nextBtn.addEventListener("click", () => {
  clearInterval(timer); // stop timer when clicking "Next"

  if (!selectedAnswer) {
    // if no answer is selected, treat as wrong and continue
  } else if (selectedAnswer === questions[currentQuestionIndex].correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  clearInterval(timer);
  questionEl.classList.add("hidden");
  answersEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  timerEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.textContent = `You scored ${score} out of ${questions.length}`;
}

showQuestion();
