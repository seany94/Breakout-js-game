// Reference to render graphic in canvas
var canvas = document.getElementById('game-container');
canvas.width = 700;
canvas.height = 600;
var ctx = canvas.getContext('2d');

// Replicate z-index in html so ball will be in front of all objects
ctx.globalCompositeOperation = 'destination-over';
var cx = 100;

// Added brick background
var brickBg = new Image();
brickBg.src = "images/bg.jpg";

// Track score, lives and timer
var score = 0;
var lives = 3;
var timer = 60;

// Bricks style
var brickRow = getRandom(8, 12);
var brickCol = getRandom(10, 18);
var brickWidth = getRandom(20, 40);
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 15;

// Assign bricks into array
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
var ballRadius = getRandom(3, 7);

// Create paddle & random paddle width
var paddleHeight = 10;
var paddleWidth = getRandom(30, 80);
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

// Check what difficulty user want to challenge
var stageOption = prompt("Which difficulty do you want to challenge?\nEasy/Hard/Crazy");
var stageOptionLower = stageOption.toLowerCase();

    if(stageOptionLower.includes('e') === true){
        alert("Earth is currently being assaulted. Not much time is left so get in there and destroy the enemy bricks!. The timer is counting down so hurry!");
        stageOption = "Easy";
        brickRow = getRandom(3, 8);
        brickCol = 8;
        brickWidth = 75;
        ballRadius = 10;
        paddleWidth = 100;
        // Remaining bricks on canvas
        var bricksLeft = brickRow * brickCol;
    }
    else if(stageOptionLower.includes('h') === true){
        alert("Please note that the size of bricks/paddle/ball is randomize for Hard and Crazy difficulty. Do not be alarm :D\n\nEarth is currently being assaulted. Not much time is left so get in there and destroy the enemy bricks!. The timer is counting down so hurry!");
        stageOption = "Hard";
        brickRow = getRandom(4, 7);
        brickCol = getRandom(8, 11);
        brickWidth = getRandom(45, 60);
        ballRadius = getRandom(7, 9);
        paddleWidth = getRandom(60, 90);
        // Remaining bricks on canvas
        var bricksLeft = brickRow * brickCol;
    }
    else if(stageOptionLower.includes('c') === true){
        alert("Please note that the size of bricks/paddle/ball is randomize for Hard and Crazy difficulty. Do not be alarm :D\n\nEarth is currently being assaulted. Not much time is left so get in there and destroy the enemy bricks!. The timer is counting down so hurry!");
        // return the global variable untouched
        stageOption = "Crazy";
        // Remaining bricks on canvas
        var bricksLeft = brickRow * brickCol;
    }
    else if(stageOptionLower.includes('e') !== true){
        alert("No such option game reloading...");
        document.location.reload();
    }

var createStage = function(){
    ctx.font = "italic lighter 18px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.fillText("Difficulty: " + stageOption, 370, 265);
}

var createBricksLeft = function(){
    ctx.font = "italic lighter 18px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.fillText("Bricks left: " + bricksLeft, 230, 265);
}

var createTimer = function(){
    ctx.font = "bold 50px Helvetica";
    ctx.fillStyle = "rgb(186, 57, 118)";
    ctx.fillText(timer, 325, 350);
}

var createTimerText = function(){
    ctx.font = "italic bold 23px Helvetica";
    ctx.fillStyle = "rgb(186, 57, 118)";
    ctx.fillText("Hurry up! Earth is getting invaded!", 175, 380);
}

var createBallSpeed = function(){
    ctx.font = "30px Helvetica";
    ctx.fillStyle = "rgb(186, 57, 118)";
    ctx.fillText("Ball Current Speed: " + ballSpeed + " mph", 180, 300);
}

var createName = function(){
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.fillText(userName, 8, 18);
}

var createScore = function(){
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.fillText("Score: " + score, 325, 18);
}

var createLives = function(){
    ctx.font = "15px Helvetica";
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
                ctx.save();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.clip();
                ctx.drawImage(brickBg, 0, 0);
                ctx.restore();
                ctx.closePath();
            }
        }
    }
}