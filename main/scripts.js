var productArr = [];
var total = 0;
var correctSku = "stranger";
var points = 0;
var counter = 0;
var wrongCounter = 0;
var timeCheck = 1;
var theUserScore = 0;
var num;
var numberForButton = 0;
var newRand = 0;
var numberForQuestions = 0;





var button1check = 0;
var button2check = 0;
var button3check = 0;



//getting info for the scoreboard

function getWrongCounter(){
    return wrongCounter;
}
function getTheUserScore() {
    return theUserScore;
}

function setTheUserScore(val) {
    theUserScore = val;
}


function getTimeCheck() {
    return timeCheck;
}

function setTimeCheck(num) {
    timeCheck = num;
}

//resets screen for next question
function removeStuff() {
    var button1 = document.getElementById("incorrectButton1");
    var button2 = document.getElementById("incorrectButton2");
    var button3 = document.getElementById("correctButton");
    var prodImage = document.getElementById("prodImage");
    var questions = document.getElementById("question-container");
    var questionHeader = document.getElementById("questionHead");

    button1.remove();
    button2.remove();
    button3.remove();
    prodImage.remove();
    questionHeader.remove();
}



function startTimer() {
    countdownTimer = setInterval(GameTimer, 1000);
}

function startGame() {


    document.getElementById("timer").className = "unhidden";
    document.getElementById("scoreboard").className = "unhidden";
    document.getElementById("skip").className = "unhidden";
    document.getElementById('score').innerHTML = "Correct: " + points +"<br>" +"<div id='red'>"+ "Wrong: " + wrongCounter +"</div>";
    



    //remove start button onclick
    if (document.getElementById("start")) {

        var startButton = document.getElementById("start");

        startButton.remove();
    }

    //use this for tracking what question you are on
    counter = counter + 1;
    productArr = [];

    //pull info from database into array
    $.getJSON('data.json', function (data) {

        $.each(data.product, function (i, f) {
            productArr.push(f);
        });

    });

    setTimeout(doSetupWithDelay, 100);
}


function doSetupWithDelay(){
    setTimeout(setup, 10);
}


//get random number
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


//mixes up the random number
function mixRandom() {
    var mixNum = getRandomArbitrary(0, 1);
    mixNum = mixNum * total;
    mixNum = Math.round(mixNum);

    return mixNum;
    
}

function getPoints() {
    return points;
}




function doQuestionNoPoints(){
    if (getTimeCheck() == 1) {



        try{
        removeStuff();
        }catch{

        }finally{
        doSetupWithDelay();
        }

    }
    //if timer is almost up, dont try to load another quesiton
    else {
        removeStuff();
        var cont = document.getElementById("imageBorder");
        var cont2 = document.getElementById("img-container");
        cont.remove();
        cont2.remove();
    }

}



//runs code to go to next question
function nextQuestion() {
    points = points + 1;
    document.getElementById('score').innerHTML = "Correct: " + points +"<br>" +"<div id='red'>"+ "Wrong: " + wrongCounter +"</div>";
    setTheUserScore(points);

    if (getTimeCheck() == 1) {



        try{
        removeStuff();
        }catch{

        }
        //startGame();
        doSetupWithDelay();

    }
    //if timer is almost up, dont try to load another quesiton
    else {
        removeStuff();
        var cont = document.getElementById("imageBorder");
        var cont2 = document.getElementById("img-container");
        cont.remove();
        cont2.remove();
    }

}

function wrongQuestion() {
    wrongCounter = wrongCounter + 1;
    document.getElementById('score').innerHTML = "Correct: " + points +"<br>" +"<div id='red'>" +"Wrong: " + wrongCounter + "</div>";


    if (getTimeCheck() == 1) {

        removeStuff();
        doSetupWithDelay();


    }
    //if timer is almost up, dont try to load another quesiton
    else {
        removeStuff();
        var cont = document.getElementById("imageBorder");
        var cont2 = document.getElementById("img-container");
        cont.remove();
        cont2.remove();
    }


}

function setup() {


    



    button1check = 0;
    button2check = 0;
    button3check = 0;
    total = productArr.length - 1;




    //get a random number
    num = mixRandom();
    if (num == total){
        num = mixRandom();
    }


        //if the image can't be found, try a new random number. If it can't be found again, set it to 3.
    
        $("#img-container").append("<img id ='prodImage' width ='94px;' height='auto' src=\"https://simplemodern.s3.us-east-2.amazonaws.com/product-quiz/" + productArr[num].SKU + ".jpg\">")
        var newImage = document.getElementById("prodImage");
        newImage.onload = function(){
        }
        newImage.onerror = function(){
            newImage = document.getElementById("prodImage");
            newImage.remove();
            num = mixRandom();
            $("#img-container").append("<img id ='prodImage' width ='94px' height='auto' src=\"https://simplemodern.s3.us-east-2.amazonaws.com/product-quiz/" + productArr[num].SKU + ".jpg\">")
            newImage = document.getElementById("prodImage");
            newImage.onerror = function(){
                newImage = document.getElementById("prodImage");
                newImage.remove();
                num = 3;
                $("#img-container").append("<img id ='prodImage' width ='94px' height='auto' src=\"https://simplemodern.s3.us-east-2.amazonaws.com/product-quiz/" + productArr[num].SKU + ".jpg\">")
            }
        }

            var incorrectButton = "strange";

            //get random number for which order buttons will be displayed, correct first, second, or last
            var numberForButton = getRandomArbitrary(0, 1);
            numberForButton = numberForButton * 2;
            numberForButton = Math.round(numberForButton);


            //This newRand is used to make random unique wrong buttons
            var newRand = mixRandom();

            var buttonDone = 0;


            //This number is used for deciding between orn, vessel, or SKU type
            var numberForQuestions = getRandomArbitrary(0, 1);
            numberForQuestions = numberForQuestions * 2;
            numberForQuestions = Math.round(numberForQuestions);


            //do ornamentation



            //Use this for Debug

           // console.log("---------------");
           // console.log("numberForQuestions ", numberForQuestions);
           // console.log("numberForButtons", numberForButton);
           // console.log("id: ", num);
           // console.log("SKU: ", productArr[num].SKU);
           // console.log("---------------");

           //


            if (numberForQuestions == 0) {


                var header = "<h1 id='questionHead'>Ornamentation </h1>";
                $(header).appendTo("body");



                switch (numberForButton) {
                    case 0:
                        //codeblock

                        //make the first button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].ornamentation + "</button>";
                        $(buttons).appendTo("#question-container");
                        button1check = 1;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);
                        correctSku = productArr[num].SKU;

                        //make second button any random orn not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].ornamentation == productArr[num].ornamentation) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].ornamentation + "</button>";
                                $(buttons).appendTo("#question-container");
                                button2check = 1;
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].ornamentation;
                            }
                        }
                        buttonDone = 0;

                        while (buttonDone == 0) {
                            if (productArr[newRand].ornamentation == productArr[num].ornamentation || incorrectButton == productArr[newRand].ornamentation) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].ornamentation + "</button>";
                                $(buttons).appendTo("#question-container");
                                button3check = 1;
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }

                        break;
                    case 1:

                        //make first button any random orn not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].ornamentation == productArr[num].ornamentation) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the first button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].ornamentation + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].ornamentation;
                            }
                        }
                        buttonDone = 0;


                        //codeblock
                        //make the second button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].ornamentation + "</button>";
                        $(buttons).appendTo("#question-container");
                        correctSku = productArr[num].SKU;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);



                        while (buttonDone == 0) {
                            if (productArr[newRand].ornamentation == productArr[num].ornamentation || incorrectButton == productArr[newRand].ornamentation) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the third button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].ornamentation + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }
                        break;
                    case 2:
                        //codeblock

                        //make first button any random orn not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].ornamentation == productArr[num].ornamentation) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the first button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].ornamentation + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].ornamentation;
                            }
                        }
                        buttonDone = 0;



                        while (buttonDone == 0) {
                            if (productArr[newRand].ornamentation == productArr[num].ornamentation || incorrectButton == productArr[newRand].ornamentation) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].ornamentation + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }

                        //codeblock
                        //make the third button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].ornamentation + "</button>";
                        $(buttons).appendTo("#question-container");
                        correctSku = productArr[num].SKU;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);

                        break;
                    default:
                        //default
                        var firstQ = "<p>ERROR</p>";
                        $(firstQ).appendTo("body");
                        break;
                }

            }

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //Doing Vessel
            else if (numberForQuestions == 1) {



                var header = "<h1 id='questionHead'>Vessel </h1>";
                $(header).appendTo("body");



                switch (numberForButton) {
                    case 0:
                        //codeblock

                        //make the first button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].vessel + "</button>";
                        $(buttons).appendTo("#question-container");
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);
                        correctSku = productArr[num].SKU;

                        //make second button any random orn not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].vessel == productArr[num].vessel) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].vessel + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].vessel;
                            }
                        }
                        buttonDone = 0;

                        while (buttonDone == 0) {
                            if (productArr[newRand].vessel == productArr[num].vessel || incorrectButton == productArr[newRand].vessel) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].vessel + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }

                        break;
                    case 1:

                        //make first button any random vessel not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].vessel == productArr[num].vessel) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the first button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].vessel + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].vessel;
                            }
                        }
                        buttonDone = 0;


                        //codeblock
                        //make the second button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].vessel + "</button>";
                        $(buttons).appendTo("#question-container");
                        correctSku = productArr[num].SKU;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);



                        while (buttonDone == 0) {
                            if (productArr[newRand].vessel == productArr[num].vessel || incorrectButton == productArr[newRand].vessel) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the third button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].vessel + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }
                        break;
                    case 2:
                        //codeblock

                        //make first button any random vessel not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].vessel == productArr[num].vessel) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the first button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].vessel + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].vessel;
                            }
                        }
                        buttonDone = 0;



                        while (buttonDone == 0) {
                            if (productArr[newRand].vessel == productArr[num].vessel || incorrectButton == productArr[newRand].vessel) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].vessel + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }

                        //codeblock
                        //make the third button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].vessel + "</button>";
                        $(buttons).appendTo("#question-container");
                        correctSku = productArr[num].SKU;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);

                        break;
                    default:
                        //default
                        var firstQ = "<p>ERROR</p>";
                        $(firstQ).appendTo("body");
                        break;
                }
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            //Doing Vessel SKU
            else if (numberForQuestions == 2) {



                var header = "<h1 id='questionHead'>SKU </h1>";
                $(header).appendTo("body");






                switch (numberForButton) {
                    case 0:

                        //codeblock

                        //make the first button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].SKU + "</button>";
                        $(buttons).appendTo("#question-container");
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);
                        correctSku = productArr[num].SKU;

                        //make second button any random orn not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].SKU == productArr[num].SKU) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].SKU + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].SKU;
                            }
                        }
                        buttonDone = 0;

                        while (buttonDone == 0) {
                            if (productArr[newRand].SKU == productArr[num].SKU || incorrectButton == productArr[newRand].SKU) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].SKU + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }

                        break;
                    case 1:

                        //make first button any random vessel not correct
                        while (buttonDone == 0) {
                            if (productArr[newRand].SKU == productArr[num].SKU) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the first button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].SKU + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].SKU;
                            }
                        }
                        buttonDone = 0;


                        //codeblock
                        //make the second button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].SKU + "</button>";
                        $(buttons).appendTo("#question-container");
                        correctSku = productArr[num].SKU;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);



                        while (buttonDone == 0) {
                            if (productArr[newRand].SKU == productArr[num].SKU || incorrectButton == productArr[newRand].SKU) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the third button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].SKU + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }
                        break;
                    case 2:

                        //codeblock

                        //make first button any random SKU not correct
                        buttonDone = 0;
                        while (buttonDone == 0) {
                            if (productArr[newRand].SKU == productArr[num].SKU) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the first button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton1' >" + productArr[newRand].SKU + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton1").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                                incorrectButton = productArr[newRand].SKU;
                            }
                        }
                        buttonDone = 0;



                        while (buttonDone == 0) {
                            if (productArr[newRand].SKU == productArr[num].SKU || incorrectButton == productArr[newRand].SKU) {
                                newRand = mixRandom();
                            }
                            else {
                                //make the second button that is incorrect
                                var buttons = "<button type ='button' class ='buttonsClass' id= 'incorrectButton2' >" + productArr[newRand].SKU + "</button>";
                                $(buttons).appendTo("#question-container");
                                document.getElementById("incorrectButton2").addEventListener("click", wrongQuestion);
                                buttonDone = 1;
                            }
                        }

                        //codeblock
                        //make the third button one that is correct
                        var buttons = "<button type ='button' class ='buttonsClass' id= 'correctButton' >" + productArr[num].SKU + "</button>";
                        $(buttons).appendTo("#question-container");
                        correctSku = productArr[num].SKU;
                        document.getElementById("correctButton").addEventListener("click", nextQuestion);

                        break;

                        
                    default:
                        //default
                        var firstQ = "<p>ERROR</p>";
                        $(firstQ).appendTo("body");
                        break;
                }

                
            }

}


