/* ============================================================
   JUEGO: QUIZ LANA
   Quiz de seis preguntas sobre la trayectoria pública de Lana Rhoades.
   ============================================================ */

(function quizGame() {
  const board = document.getElementById("gameBoard");
  if (!board) return;

  const movesEl = document.getElementById("gameMoves");
  const pairsEl = document.getElementById("gamePairs");
  const timeEl = document.getElementById("gameTime");
  const winBox = document.getElementById("gameWin");
  const winText = document.getElementById("gameWinText");

  const QUESTIONS = [
    { question: "¿En qué área se hizo conocida Lana Rhoades?", answers: ["Cultura digital", "Astronomía", "Arquitectura"], correct: 0 },
    { question: "¿Qué formato forma parte de su presencia pública?", answers: ["Podcast y entrevistas", "Ópera", "Novela histórica"], correct: 0 },
    { question: "¿Qué tema aparece en su conversación pública?", answers: ["Privacidad", "Arqueología submarina", "Meteorología"], correct: 0 },
    { question: "¿Qué elemento ayuda a construir una marca personal?", answers: ["Una identidad visual", "Un mapa antiguo", "Una receta"], correct: 0 },
    { question: "¿Dónde se pueden consultar publicaciones actuales?", answers: ["Perfiles públicos verificados", "Cualquier cuenta anónima", "Mensajes privados"], correct: 0 },
    { question: "¿Qué debe revisarse antes de reutilizar una foto?", answers: ["Créditos y permisos", "Solo el color", "El número de likes"], correct: 0 }
  ];

  let current = 0;
  let score = 0;
  let seconds = 0;
  let timer = null;
  let started = false;
  let answered = false;

  function formatTime(value) {
    return Math.floor(value / 60) + ":" + String(value % 60).padStart(2, "0");
  }

  function startTimer() {
    if (started) return;
    started = true;
    timer = setInterval(() => {
      seconds++;
      timeEl.textContent = formatTime(seconds);
    }, 1000);
  }

  function renderQuestion() {
    const item = QUESTIONS[current];
    answered = false;
    board.innerHTML = "";

    const panel = document.createElement("article");
    panel.className = "quiz-panel";
    panel.innerHTML =
      '<span class="quiz-index">Pregunta ' + (current + 1) + " / " + QUESTIONS.length + "</span>" +
      '<h3 class="quiz-question">' + item.question + "</h3>" +
      '<div class="quiz-options" role="group" aria-label="Opciones de respuesta"></div>';
    const options = panel.querySelector(".quiz-options");

    item.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.innerHTML = '<span class="quiz-letter">' + String.fromCharCode(65 + index) + "</span>" + answer;
      button.addEventListener("click", () => chooseAnswer(button, index, item.correct));
      options.appendChild(button);
    });

    board.appendChild(panel);
    pairsEl.textContent = current;
  }

  function chooseAnswer(selected, answerIndex, correctIndex) {
    if (answered) return;
    startTimer();
    answered = true;
    movesEl.textContent = ++score;
    const buttons = board.querySelectorAll(".quiz-option");
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === correctIndex) button.classList.add("is-correct");
    });
    selected.classList.add(answerIndex === correctIndex ? "is-correct" : "is-wrong");

    setTimeout(() => {
      current++;
      if (current === QUESTIONS.length) finish();
      else renderQuestion();
    }, 700);
  }

  function finish() {
    clearInterval(timer);
    pairsEl.textContent = QUESTIONS.length;
    winText.textContent = "Acertaste " + score + " de " + QUESTIONS.length + " preguntas en " + formatTime(seconds) + ".";
    winBox.hidden = false;
    requestAnimationFrame(() => winBox.classList.add("show"));
  }

  function reset() {
    clearInterval(timer);
    current = 0;
    score = 0;
    seconds = 0;
    started = false;
    answered = false;
    movesEl.textContent = "0";
    pairsEl.textContent = "0";
    timeEl.textContent = "0:00";
    winBox.classList.remove("show");
    winBox.hidden = true;
    renderQuestion();
  }

  document.getElementById("gameRestart").addEventListener("click", reset);
  document.getElementById("gamePlayAgain").addEventListener("click", reset);
  reset();
})();
