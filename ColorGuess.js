var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var correctDisplay = document.getElementById("correctDisplay");
var resetButton = document.getElementById("reset");
var h1 = document.getElementById("h1");
var modeButtons = document.getElementsByClassName("mode");

gameInit();
connectToServiceWorker();

function connectToServiceWorker(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker
      .register("./worker.js")
      .then(() => {
        console.log("seviceWorker registered");
      });
  }
}

function gameInit(){
   setUpModeButtons();
   setUpSquares();
   reset();
}

function setUpSquares() {
  for(var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click",function () {
      var clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor) {
          correctDisplay.textContent = "Correct!!!";
          changeColors(clickedColor);
          h1.style.backgroundColor = clickedColor;
          resetButton.textContent = "Play Again?"
      }
      else{
        this.style.backgroundColor = "#333";
        correctDisplay.textContent = "Try Again";}
    })
  }
}

function setUpModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click",function () {
     modeButtons[0].classList.remove("selected");
     modeButtons[1].classList.remove("selected");
     this.classList.add("selected");
     this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
     reset()
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    if(colors[i]){
      squares[i].style.display = "block"
      squares[i].style.backgroundColor = colors[i]
    }
    else{
      squares[i].style.display = "none"
    }
    h1.style.backgroundColor = "rgb(65, 158, 136)";
    resetButton.textContent = "New Colors"
    correctDisplay.textContent = "";
}
}

function changeColors(color){
  for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  var arr = [];
  for(var i = 0; i < num; i++){
  arr.push(randomColor());
  }
  return arr;
}

function randomColor(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

resetButton.addEventListener("click",function(){
  reset();
});
