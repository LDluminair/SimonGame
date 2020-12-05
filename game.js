var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;


$(document).on("keydown touchstart", function(event){
    if (started === false){
    nextSequence()
    started = true;


  }
});

// Simon resets the user selections, raises the level number, and selects a new button.

function nextSequence() {
  $("h2").addClass("hidden");
  userClickedPattern = [];
  score++;
  level++;
  $("h1").text("Level " + level);
  var ranNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[ranNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(60).fadeIn(100);
  var gameSound = new Audio("sounds/" + randomChosenColor + ".mp3");
  gameSound.play();
}

// User Chosing A button

$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length -1);


})

// Checking Answer

function checkAnswer(level){
  if (userClickedPattern[level] === gamePattern[level]){

    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){nextSequence()}, 800);
}
}
  else{
    var wrongBuzz = new Audio("sounds/wrong.mp3");
    wrongBuzz.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 300);

    startOver();

  }
}

// Restarting the game

function startOver(){
  $("h1").text("Game Over! Press Any Key to Restart" );
  $("h2").text("--- Score " + score +" ---").removeClass("hidden");
  level = 0;
  score = 0;
  gamePattern =[];
  started = false;
}

// User Click Sound

function playSound(userChosenColor) {
  var playerSound = new Audio("sounds/" + userChosenColor + ".mp3");
  playerSound.play();
}

// User Click Animation

function animatePress(userChosenColor){
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(function(){$("#" + userChosenColor).removeClass("pressed");}, 100);
}
