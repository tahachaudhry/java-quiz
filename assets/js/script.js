var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var remarkEl = document.querySelector("#remark");

var time = questions.length * 15; 
var timerId;
var currentQuestionIndex = 0;

function startQuiz() {
    var startScreenEl = document.getElementById("start-page"); 
    startScreenEl.setAttribute("class", "hide"); 
  
     timerEl.textContent = time;
     timerId = setInterval(secondTick, 1000);
  
    questionsEl.removeAttribute("class"); 
    showQuestion();
  }

  function showQuestion() {
    choicesEl.innerHTML = "";

  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  currentQuestion.choices.forEach(function(choice, i) {

    const choiceNode = document.createElement("button");
    choiceNode.setAttribute("value", choice);
    choiceNode.setAttribute("class", "choice");
    choiceNode.textContent = i + 1 + ". " + choice;
    
        choicesEl.appendChild(choiceNode);
    choiceNode.onclick = clickQuestion;
  });
}

function clickQuestion() { 
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
    if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      remarkEl.textContent = "WRONG!";
      remarkEl.style.fontSize = "200%";
      remarkEl.style.color = "red";
    } else {
      remarkEl.textContent = "CORRECT!";
      remarkEl.style.fontSize = "200%";
      remarkEl.style.color = "green";
    }
  
    remarkEl.setAttribute("class", "remark");
    setTimeout(function() {
      remarkEl.setAttribute("class", "hide remark");
    }, 1000);
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex === questions.length) {
      endQuiz(); 
    } else {
      showQuestion();
    }
  }

function endQuiz() {
     var endScreenEl = document.getElementById("last-page"); 
     endScreenEl.removeAttribute("class");
      questionsEl.setAttribute("class", "hide");
     clearInterval(timerId);
     var finalScoreEl = document.getElementById("final-score");
     finalScoreEl.textContent = time;
   }
    function secondTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }

  function submitHighscore() {
      var initials = initialsEl.value.trim();
      
      if (initials !== "") {
      var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        initials: initials
      };
      
      highscores.push(newScore);
      localStorage.setItem("highscores", JSON.stringify(highscores));
  
      location.href = "highscores.html";
    }
  }
function checkEnterkey(event) {
    if (event.key === "Enter") {
      submitHighscore();
    }
  }
  startBtn.onclick = startQuiz;
  submitBtn.onclick = submitHighscore;
  initialsEl.onkeyup = checkEnterkey;