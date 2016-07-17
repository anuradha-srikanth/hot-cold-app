
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    //var userInput = $("#userGuess").val()
    //console.log(userInput);
    newGame();
    $("a.new").click(newGame);
    //$("a.new").click(newGame());
    console.log("na");
});

var guessNumber;
var arrayOfGuesses;
var randomNum
var prevGuess;

function newGame(){
    //should reinitialize all variables
    console.log('initialize all variables')
    guessNumber = 0;
    arrayOfGuesses = new Array();
    prevGuess = 0;
    randomNum = Math.floor(Math.random() * 100)+1;
    console.log(randomNum);
    //console.log(guessNumber);
    $("#count").text(guessNumber)
    /*while($("#guessList").first()){
        $("#guessList").first().remove();
    }*/
    $("#guessList li").remove();
    $("#feedback").text("Make your Guess!");
    $("#progress").text("Progress");
    makeGuess();
}

function checkValidGuess(userGuess){
    //checks if guess is a whole number
    return (Number.isInteger(userGuess) && 0<=userGuess && userGuess<=100)
}

function prevGuessFeedback(userGuess){
    if (arrayOfGuesses.length > 1){
        prevGuess = arrayOfGuesses[arrayOfGuesses.length - 2]
        console.log("prevguess" + prevGuess);
        var diffCurrentGuess = randomNum - userGuess;
        var diffPrevGuess = randomNum - prevGuess;
        console.log("diffCurrentGuess "+ diffCurrentGuess + " diffPrevGuess" + diffPrevGuess)
        if (Math.abs(diffCurrentGuess) < Math.abs(diffPrevGuess)){
            $("#progress").text("Warmer from previous guess");
        } else{
            $("#progress").text("Colder from previous guess");
        }
    }
}

function feedbackToUser(userGuess){
    var difference = randomNum - userGuess;
    //console.log("difference" + difference)
    if (Math.abs(difference) >= 50){
        $("#feedback").text("ice cold");
    } else if( 30 <= Math.abs(difference) && Math.abs(difference) <= 50){
        $("#feedback").text("cold");
    } else if(20 <= Math.abs(difference) && Math.abs(difference) <= 30){
        $("#feedback").text("warm");
    } else if(10 <= Math.abs(difference) && Math.abs(difference) <= 20){
        $("#feedback").text("hot");
    } else if(10 >= Math.abs(difference)){
        if (difference == 0){
            //you win
            $("#feedback").text("You Won! Click new game to play again");
        }else{
            $("#feedback").text("very hot");
        }
    }
    //$("#feedback").text(difference);
    //document.getElementById("feedback").innerHTML = difference;
}

function inArray(array1, item){
    for (var i=0; i<array1.length; i++){
        if (array1[i]==item){
            return true
        }
    }
    return false;
}

function makeGuess(){
    $("#guessButton").on("click", function(){
        event.preventDefault();
        var userInput = parseInt($("#userGuess").val());
        //console.log(userInput);
        $("#userGuess").val('');
        //$("#userGuess").attr("placeholder")
        //console.log(typeof(userInput));
        if (checkValidGuess(userInput)){
            //console.log(userInput);
            if (!inArray(arrayOfGuesses, userInput)){
                arrayOfGuesses.push(userInput);
                var template = "<li>" + userInput + "</li>";
                $("#guessList").append(template);
                guessNumber += 1
                $("#count").text(guessNumber);
                feedbackToUser(userInput);
                prevGuessFeedback(userInput);
            } else{
                alert("you have already guessed this number")
            }
        }
        else{
            alert("please use a valid number")
        }
    })
}
