

var isWaiting = false;
var isRunning = false;
var seconds = 60;
var countdownTimer;
var finalCountdown = true;
var scoreArrTimer = [];
var initialsVal;
var theScore;




function loadScores() {
  return new Promise(function (resolve, reject) {

    //var entry;

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {


        var data = req.responseText;
        var jsonResponse = JSON.parse(data);
        resolve(jsonResponse);


      }
    };


    req.open("GET", "https://api.jsonbin.io/b/60ec54b3c68da8710307e5f6/latest", true);
    req.send();

  });
}





function editScore(input, initials, score){

  input["score"].push({"initials" : initials, "score" : score});
  return input;


}

function saveScore(entry) {
  return new Promise(function (resolve, reject) {

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);

        var data = req.responseText;
        var jsonResponse = JSON.parse(data);


        resolve(jsonResponse);

      }
    };
    req.open("PUT", "https://api.jsonbin.io/b/60ec54b3c68da8710307e5f6", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("versioning", false);

    console.log("stringify: ", JSON.stringify(entry));
    req.send(JSON.stringify(entry));
  });


}


function runScoreboard() {
   window.location.href = "./scoreboard/scoreboard.html";
}

const formatEntry = (initials, score) => ({

  "score": [
    {
      "initials": initials,
      "score": score
    }
  ]




});



function captureInfo() {


  initialsVal = document.getElementById("initials").value;
  theScore = getTheUserScore();
  var initialsValue = formatEntry(initialsVal, theScore);
  initialsValue = JSON.stringify(initialsValue);
  if (initialsVal !== "") {

    //saveScore(initialsValue);


    loadScores().then(function (jsonResponse){
      return editScore(jsonResponse, initialsVal, theScore);
    }).then(function (score){
      return saveScore(score);
    }).then(function (){
        runScoreboard();
    })
  
  }

}

function enterName() {

  captureInfo();

}


function GameTimer() {
  var minutes = Math.round((seconds - 30) / 60);
  var remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  document.getElementById('timer').innerHTML ="<p id='waiting_time'>" + minutes + ":" + remainingSeconds + "</p>";
  if (seconds == 0) {
    remainingSeconds = 0;
    setTimeCheck(0);

    clearInterval(countdownTimer); // Clear the interval to stop the loop

    document.getElementById("theForm").className = "unhidden";


    var imgBorder = document.getElementById("imageBorder");
    var button1 = document.getElementById("incorrectButton1");
    var button2 = document.getElementById("incorrectButton2");
    var button3 = document.getElementById("correctButton");
    var prodImage = document.getElementById("prodImage");
    var questionHeader = document.getElementById("questionHead");
    var skipButton = document.getElementById("skip");
    try {

      button1.remove();
      button2.remove();
      button3.remove();
      skipButton.remove();
      prodImage.remove();
      questionHeader.remove();
      imgBorder.remove();
    }
    catch { }
    //finally{





    var wrong = getWrongCounter();
    var points = getTheUserScore();


    var finalScore = points - wrong;
    document.getElementById('scoreSubtractionText').innerHTML = "Total Score: " + finalScore;
    setTheUserScore(finalScore);


  }
  else {
    //this makes sure you cant jump out of the time limit
    if (seconds == 1) {
      setTimeCheck(0);
      isWaiting = true;
      seconds--;
    }

    else {
      isWaiting = true;
      seconds--;
    }
  }

}
//countdownTimer = setInterval(GameTimer, 1000); // Pass function reference, don't invoke it.