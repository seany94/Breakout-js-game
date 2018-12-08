// Reference to render graphic in canvas
var canvas = document.getElementById('game-container');
canvas.width = 700;
canvas.height = 600;
var ctx = canvas.getContext('2d');
ctx.fillStyle = "red";
ctx.lineWidth = 3;
ctx.strokeStyle = "red";
ctx.strokeRect(0, 0, canvas.width, canvas.height);
// Create Rectangle object in canvas
ctx.beginPath();
ctx.rect(10, 10, 160, 20);
ctx.fillStyle = "#56FF8A";
ctx.fill();
ctx.closePath();

// Define the number of rows and columns of bricks
// var brickRows = getRandom(2, 5);
// var brickCols = getRandom(8, 15);

// Hard coded the position where the ball will start and how it moves
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
}

var createBall = function(){
    // Create ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

var moveBall = function() {
    // Clear the canvas every time the function run
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createBall();
    x += dx;
    y += dy;
    if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
    }
    else if(x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
    }
    else if(y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    }
}
setInterval(moveBall, 10);

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