var request = new XMLHttpRequest();
var response;
var score = 0;

document.addEventListener('DOMContentLoaded', function (){
request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log(request.response);
        response = request.response.results;

        var content = document.getElementById("content");

        response.forEach(function(question, index) {

          //card 
          let card = document.createElement("div"); 
          card.classList.add("card"); 
          card.id = index;
          content.appendChild(card); 

          //questions
          var title = document.createElement("h4");
          title.innerHTML = question.question;
          card.appendChild(title);

          //buttons
          var svar = question.incorrect_answers; 
          svar.push(question.correct_answer);
          svar.sort();
          
          //buttons for answers
          for(var i = 0; i < svar.length; i++){
            var knapp = document.createElement("input");
            knapp.type = "submit";
            knapp.value = svar[i];
            knapp.setAttribute("class", "buttons")
            if (knapp.value == question.correct_answer) {
              knapp.setAttribute ("id", "correct") 
            } 
            card.appendChild(knapp);
          }

          //eventListener: buttons, score and that only one button could be clicked in a q. 
          function answerLi() {
            var buttons = document.getElementsByClassName("buttons")
            for (var i = 0; i < buttons.length; i++) {
              buttons[i].addEventListener("click", function() {
                if (this.parentNode.className != "oneAnswer") {
                  if (this.id == "correct") {
                    this.style.backgroundColor = "green";
                    score++;
                    var outcome = document.getElementById("result");
                    outcome.innerHTML = score;
                    console.log(score);
                  } 
                  else {
                    this.style.backgroundColor = "red";
                  }
                }
              this.parentNode.setAttribute("class", "oneAnswer")
              });
            }
          }
          answerLi()
        });
      }
    }
};

//open communication
request.open('GET', 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean');
request.responseType = "json";
request.send();
});
