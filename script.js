var request = new XMLHttpRequest();
var response;

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

          //img
          var img = document.createElement("img");
          img.src ="https://png2.kisspng.com/sh/3cd2b017b2abad66a64daeedbd0377ca/L0KzQYm3WcAyN5pqepH0aYP2gLBuTgRzfZYyhAQ2ZnHvg7a0lQJqfppmRdhqY4T2PbT2jgB2fJZ3Rdtsb372PbTzigAuaaN5RdN5cHH2ebK0kCR2bJp0RdN3ZILyebW0ggBxe15miOJ3YYqwc7F0TcVjQJJqTKM6OUnlQIiCTsM3PWY8Uak5MUW2RYm5WcAxQWc3Uac3cH7q/kisspng-true-or-false-trivia-facts-computer-icons-clip-art-appasia-studio-android-apps-appnaz-com-5b8ae41199b079.3655797015358290096295.png";
          card.appendChild(img);

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

          var score = 0;

          //eventListener till knapparna and keep score
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
