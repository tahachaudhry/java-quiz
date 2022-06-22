function viewHighscores() { 
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      var li = document.createElement("li");
      li.textContent = score.initials + " - " + score.score;
  
      var olHighScoresEl = document.getElementById("highscores");
      olHighScoresEl.appendChild(li);
    });
  }
  
  function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  viewHighscores();
  
  document.getElementById("clear").onclick = clearHighscores;