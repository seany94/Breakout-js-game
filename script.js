// Reference to render graphic in canvas
var canvas = document.getElementById('game-container');
canvas.width = 700;
canvas.height = 600;
var ctx = canvas.getContext('2d');
// Track score
var score = 0;

// Bricks style
var brickRow = getRandom(2, 5);
var brickCol = getRandom(5, 8);
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

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

// Hard coded the position where the ball will start and how it moves
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
// Circumference of ball
var ballRadius = 10;
// Create paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddle = (canvas.width - paddleWidth) / 2;
// Check for user key press
var rightPressed = false;
var leftPressed = false;

var createScore = function(){
    ctx.font = "15px Helvetica";
    ctx.fillStyle = "#7EFF37FF";
    ctx.weight = "bold";
    ctx.fillText("Score: " + score, 8, 18);
}

var createBall = function(){
    // Create ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function createPaddle(){
    ctx.beginPath();
    ctx.rect(paddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#AFFF91FF";
    ctx.fill();
    ctx.closePath();
}

function createBricks(){
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

var moveBall = function(){
    // Clear the canvas every time the function run
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Recreate canvas after clearing
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    createScore();
    createBricks();
    createBall();
    createPaddle();
    collision();
    x += dx;
    y += dy;
    // checking for the circumference of ball touching the wall
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    else if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius){
        // Condition to allow the ball to bounce off paddle so as to not to end game
        if(x > paddle && x < paddle + paddleWidth){
            dy = -dy;
        }
        else {
            // Stop ball from moving and show game over screen
            clearInterval(interval);
            gameOver();
            document.querySelector('.endgame-lose').addEventListener("click", function(){
                document.location.reload();
            });
        }
    }
    // Checking for whether the paddle goes off the canvas
    else if(rightPressed && paddle < canvas.width - paddleWidth){
        paddle += 2;
    }
    else if(leftPressed && paddle > 0){
        paddle -= 2;
    }
}

// Detect collision for every brick in row and column
function collision(){
    for(var i = 0; i < brickCol; i++){
        for(var j = 0; j < brickRow; j++){
            var brickObj = bricksArr[i][j];
            // Check if ball collide with brick if so ball bounce back and brick disappear
            if(brickObj.appearance === true){
                if(x > brickObj.x && x < brickObj.x + brickWidth && y > brickObj.y && y < brickObj.y + brickHeight){
                    dy = -dy;
                    brickObj.appearance = false;
                    score++;
                        // Check if all bricks disappear from canvas to declare win
                        if(score === brickRow * brickCol){
                            clearInterval(interval);
                            win();
                            document.querySelector('.endgame-win').addEventListener("click", function(){
                            document.location.reload();
                        });
                    }
                }
            }
        }
    }
}

// Function to check for user key up and down
// Key code 37 is left arrow key and key code 39 is right arrow key
function keyDown(status){
    if(status.keyCode == 39){
        rightPressed = true;
    }
    else if(status.keyCode == 37){
        leftPressed = true;
    }
}

function keyUp(status){
    if(status.keyCode == 39){
        rightPressed = false;
    }
    else if(status.keyCode == 37){
        leftPressed = false;
    }
}

// Make paddle stick to user cursor
function mouseMove(status){
    var relativePad = status.clientX - canvas.offsetLeft;
    // Checking for whether the paddle goes off the canvas
    if(relativePad - (paddleWidth / 2) > 0 && relativePad < canvas.width - (paddleWidth / 2)){
            // Fix cursor in the middle of paddle
            paddle = relativePad - paddleWidth / 2;
    }
}

// Create a game over screen
var gameOver = function(){
    var gameOverBox = document.createElement('div');
    gameOverBox.setAttribute("class", "endgame-lose");
    gameOverBox.innerHTML = "Game Over!<br><span>Click here to retry</span>";
    document.body.appendChild(gameOverBox);
    var gameOverClick = document.querySelector('.endgame-lose');
}

// Create win screen
var win = function(){
    var winBox = document.createElement('div');
    winBox.setAttribute("class", "endgame-win");
    winBox.innerHTML = "Congratulation!<br><span>You beat the game<br>Click here to retry</span></span><br><span>Score: <span>" + score;
    document.body.appendChild(winBox);
    var winClick = document.querySelector('.endgame-win');
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
document.addEventListener("mousemove", mouseMove, false);
var interval = setInterval(moveBall, 10);

window.onload = function(){
}