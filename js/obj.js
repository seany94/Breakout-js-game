// Reference to render graphic in canvas
var canvas = document.getElementById('game-container');
canvas.width = 700;
canvas.height = 600;
var ctx = canvas.getContext('2d');

// // Added canvas background
// var background = new Image();
// background.src = "images/bg.jpg";

// Track score, lives and timer
var score = 0;
var lives = 3;
var timer = 60;

// Bricks style
var brickRow = 5;
var brickCol = 8;
var brickWidth = 75;
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

// Random the position where the ball will start and how it moves
var x = getRandom(100, 650);
var y = getRandom(300, 600);
// The distance and direction of the ball travel
var dx = 2;
var dy = -2;

// Ball speed
var ballSpeed = 10;

// Circumference of ball & random the size
var ballRadius = 10;

// Create paddle & random paddle width
var paddleHeight = 10;
var paddleWidth = 100;
var paddle = (canvas.width - paddleWidth) / 2;

// Check for user key press
var rightPressed = false;
var leftPressed = false;

// Check for user input and the length
var userName = prompt("Please input your name");

    if(userName === null){
        alert("Input empty game reloading...");
        document.location.reload();
    }
    else if(userName.length > 20){
        alert("Limit username to 20 characters max");
        document.location.reload();
    }

// Check for user input on using mouse or keyboard
var option = prompt("Do you want to use the keyboard or the mouse to play? K/M");
var optionLower = option.toLowerCase();

// var stageOption = prompt("Which difficulty do you want to challenge?\nEasy/Hard/Insane");
// var stageOptionLower = stageOption.toLowerCase();

//     if(stageOptionLower.includes('e') === true){
//         stageE();
//     }
//     else if(stageOptionLower.includes('h') === true){
//         stageH();
//     }
//     if(stageOptionLower.includes('i') === true){
//         stageI();
//     }
//     else{
//         alert("No such option game reloading...");
//         document.location.reload();
//     }

// var stageE = function(){
//     var brickRow = getRandom(2, 6);
//     var brickWidth = getRandom(50, 75);
//     var ballRadius = getRandom(5, 20);
//     var paddleWidth = getRandom(80, 200);
// }

// alert("Please note that the size of bricks/paddle/ball is randomize. Do not be alarm :D\nGet in there the timer is counting down");

var createTimer = function(){
    ctx.font = "50px Helvetica";
    ctx.fillStyle = "rgb(186, 57, 118)";
    ctx.fillText(timer, 325, 350);
}

var createTimerText = function(){
    ctx.font = "italic bold 23px Helvetica";
    ctx.fillStyle = "rgb(186, 57, 118)";
    ctx.weight = "700";
    ctx.fillText("Hurry up! The World is ending!", 200, 380);
}

var createBallSpeed = function(){
    ctx.font = "30px Helvetica";
    ctx.fillStyle = "rgb(186, 57, 118)";
    ctx.weight = "bold";
    ctx.fillText("Ball Current Speed: " + ballSpeed + " mph", 180, 300);
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