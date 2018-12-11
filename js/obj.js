// Reference to render graphic in canvas
var canvas = document.getElementById('game-container');
canvas.width = 700;
canvas.height = 600;
var ctx = canvas.getContext('2d');

// // Added canvas background
// var background = new Image();
// background.src = "images/bg.jpg";

// Track score and lives
var score = 0;
var lives = 3;

// Bricks style
var brickRow = getRandom(2, 6);
var brickCol = 8;
var brickWidth = getRandom(50, 75);
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 15;

var bricksArr = [];
for(var i = 0; i < brickCol; i++){
    bricksArr[i] = [];
    for(var j = 0; j < brickRow; j++){
        // Brick object to store every single brick value
        bricksArr[i][j] ={
            x: 0,
            y: 0,
            appearance: true
        };
    }
}

// Math random function to generate range for math random
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

// Define the number of rows and columns of bricks
// var brickRows = getRandom(2, 5);
// var brickCols = getRandom(8, 15);

// Random the position where the ball will start and how it moves
var x = getRandom(100, 650);
var y = getRandom(300, 600);
// The distance and direction of the ball travel
var dx = 2;
var dy = -2;

// Circumference of ball & random the size
var ballRadius = getRandom(5, 20);

// Create paddle & random paddle width
var paddleHeight = 10;
var paddleWidth = getRandom(80, 200);
var paddle = (canvas.width - paddleWidth) / 2;

// Check for user key press
var rightPressed = false;
var leftPressed = false;

// Check for user input and the length
var userName = prompt("Please input your name");
if(userName == null){
    document.location.reload();
}
else if(userName.length > 20){
        alert("Limit username to 20 characters max");
        document.location.reload();
}

// Check for user input on using mouse or keyboard
var option = prompt("Do you want to use the keyboard or the mouse to play? K/M");
alert("Please note that the size of bricks/paddle/ball is randomize. Do not be alarm :D");
var optionLower = option.toLowerCase();
if(option == null){
    document.location.reload();
}

var createName = function(){
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.weight = "bold";
    ctx.fillText(userName, 8, 18);
}

var createScore = function(){
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.weight = "bold";
    ctx.fillText("Score: " + score, 325, 18);
}

var createLives = function(){
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.weight = "bold";
    ctx.fillText("Lives: " + lives, 640, 18);
}

var createBall = function(){
    // Create ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

var createPaddle = function(){
    ctx.beginPath();
    ctx.rect(paddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#AFFF91FF";
    ctx.fill();
    ctx.closePath();
}

var createBricks = function(){
    for(var i = 0; i < brickCol; i++){
        for(var j = 0; j < brickRow; j++){
            // Create bricks only when brick appearance is true
            if(bricksArr[i][j].appearance === true){
                // Set position of each brick
                var brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                bricksArr[i][j].x = brickX;
                bricksArr[i][j].y = brickY;
                // Create bricks
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#AFFF91FF";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}