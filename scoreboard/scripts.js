var nameCounter =0;
var tableContentArr =[];
var scoresArr = [];
var counter = 0;
var outputScores;
const scoresUrl ="";


function setScoresFromTimer(val, iterator){
    scoresArr[iterator] = val;
}


function createTable(){
    for(var i = 0; i < scoresArr.length; i++){

    
        outputScores = "<tr><th>" + scoresArr[i].initials + "</th><th> " + scoresArr[i].score +   " </th></tr>";
        $(outputScores).appendTo("#tableContent");
    }
}


function loadScores(){

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    console.log(jsonResponse["score"]);
    //reads in the json data to array
    for(var i = 0; i < jsonResponse["score"].length; i++){
        scoresArr[i] = jsonResponse["score"][i];
    }
    //sorts array data by score
    scoresArr.sort(function(a,b){
             return b.score - a.score;
         });
         //outputs array data to the table
         for(var i = 0; i < jsonResponse["score"].length; i++){

    
            outputScores = "<tr><th>" + scoresArr[i].initials + "   </th><th> " + scoresArr[i].score +   " </th></tr>";
            $(outputScores).appendTo("#tableContent");
        }
  }
};

req.open("GET", "https://api.jsonbin.io/b/60ec54b3c68da8710307e5f6/latest", true);
req.send();


}


window.onload = function(){
  
  loadScores();
}




function consoleTheArray(){
    for(var i = 0; i < scoresArr.length;i++){
        console.log("the Array: ", i , " ", scoresArr[i].initials);
    }
}


function saveScore(entry){
    return fetch(scoresUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
}






function tryAgain(){
    window.location.href = "../index.html";
}

