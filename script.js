// Reference to render graphic in canvas
var canvas = document.getElementById("game-container");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.rect(10, 5, 60, 5);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// Define the number of rows and columns of bricks
// var brickRows = getRandom(2, 5);
// var brickCols = getRandom(8, 15);

var brickRows = 3;
var brickCols = 9;

// Math random function to generate range for math random
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var bricksArr = [];

window.onload = function(){
    // for(var i = 0; i < brickCols; i++){
    //     for(var j = 0; j < brickRows; j++){
    //         var bricks = brickRows[i][j];
    //         var bricksNum = document.createElement("div");
    //         bricksNum.setAttribute("class", "brick");
    //         document.getElementById("game-container").appendChild(bricksNum);
    //     }
    // }
}