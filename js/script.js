window.onload = function(){

    var moveBall = function(){
        // Clear the canvas every time the function run
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Recreate canvas after clearing
        // ctx.drawImage(background, 0, 0);
        ctx.fillStyle = "red";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        createBall();
        // Create ball thats go in front of any text on screen
        cx += 20;
        createName();
        createScore();
        createLives();
        createBricks();
        createBricksLeft();
        createPaddle();
        createBallSpeed();
        createTimer();
        createStage();
        collision();
        // Check for timer and print timer text
        if(timer < 50){
            createTimerText();
        }
        // Calculate the collision at line of the paddle
        var paddleDistX = Math.abs(x - paddle - paddleWidth / 2);
        var paddleDistY = Math.abs(y - (canvas.height - paddleHeight) - paddleHeight / 2);
        // Calculate the collision at the edge of the paddle
        var paddleColX = paddleDistX - paddleWidth / 2;
        var paddleColY = paddleDistY - paddleHeight / 2;
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
            // Condition to allow the ball to bounce off paddle so as to not to end game + added collision to edge of paddle
            if(paddleDistX < (paddleWidth / 2) || ((paddleColX * paddleColX + paddleColY * paddleColY) < (ballRadius * ballRadius))){
                dy = -dy;
            }
            else {
                // Check for how many lives when 0 end the game
                lives--;
                ballSpeed = 10;
                if(lives === 0){
                    // Stop ball from moving and show game over screen
                    gameOver();
                    clearInterval(interval);
                    clearInterval(countDown);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "red";
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                }
                else{
                    // Create the ball back in canvas when there is still lives
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddle = (canvas.width - paddleWidth) / 2;
                }
            }
        }
        // Checking for whether the paddle goes off the canvas
        else if(rightPressed && paddle < canvas.width - paddleWidth){
            paddle += 8;
        }
        else if(leftPressed && paddle > 0){
            paddle -= 8;
        }
    }

    // Detect collision for every brick in row and column
    var collision = function(){
        for(var i = 0; i < brickCol; i++){
            for(var j = 0; j < brickRow; j++){
                var brickObj = bricksArr[i][j];
                // Check if ball collide with brick if so ball bounce back and brick disappear
                if(brickObj.appearance === true){
                    // Calculate the collision at the line of the brick
                    var brickDistX = Math.abs(x - brickObj.x - brickWidth / 2);
                    var brickDistY = Math.abs(y - brickObj.y - brickHeight / 2);
                    // Calculate the collision at the edge of the brick
                    var brickColX = brickDistX - brickWidth / 2;
                    var brickColY = brickDistY - brickHeight / 2;
                    if(brickDistX < (brickWidth / 2) && brickDistY <(brickHeight / 2) || ((brickColX * brickColX + brickColY * brickColY) < (ballRadius * ballRadius))){
                        dy = -dy;
                        brickObj.appearance = false;
                        score++;
                        bricksLeft--;
                        ballAccel();
                            // Check if all bricks disappear from canvas to declare win
                            if(score === brickRow * brickCol){
                                win();
                                clearInterval(interval);
                                clearInterval(countDown);
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = "red";
                                ctx.lineWidth = 3;
                                ctx.strokeStyle = "red";
                                ctx.strokeRect(0, 0, canvas.width, canvas.height);
                        }
                    }
                }
            }
        }
    }

    // Function to check for user key up and down
    // Key code 37 is left arrow key and key code 39 is right arrow key
    var keyDown = function(status){
        if(status.keyCode == 39){
            rightPressed = true;
        }
        else if(status.keyCode == 37){
            leftPressed = true;
        }
    }

    var keyUp = function(status){
        if(status.keyCode == 39){
            rightPressed = false;
        }
        else if(status.keyCode == 37){
            leftPressed = false;
        }
    }

    // Make paddle move with user cursor
    var mouseMove = function(status){
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
        gameOverBox.innerHTML = "Game Over!<br><span>Don't give up try harder!</span><br><span>Click here to retry</span><br><br>" + "<span>" + userName + "</span><br>" + "<span>Score: </span>" + score + " " + "<span>---</span>" + " " + "<span>Lives: </span>" + lives;
        document.body.appendChild(gameOverBox);
        document.querySelector('.endgame-lose').addEventListener("click", function(){
            document.location.reload();
        });
    }

    // Create win screen
    var win = function(){
        var winBox = document.createElement('div');
        winBox.setAttribute("class", "endgame-win");
        winBox.innerHTML = "Congratulation!<br><span>You beat the game<br>Click here to retry</span></span><br><br>" + "<span>" + userName + "</span><br>" + "<span>Score: </span>" + score + " " + "<span>---</span>" + " " + "<span>Lives: </span>" + lives;
        document.body.appendChild(winBox);
        document.querySelector('.endgame-win').addEventListener("click", function(){
            document.location.reload();
        });
    }

    // Get user input on whether they want to use keyboard or mouse in prompt outside window onload function
    var choice = function(options){
        if(optionLower.includes('k') === true){
            document.addEventListener("keydown", keyDown, false);
            document.addEventListener("keyup", keyUp, false);
        }
        else if(optionLower.includes('m') === true){
            document.addEventListener("mousemove", mouseMove, false);
        }
        else{
            alert("No such option game reloading...");
            document.location.reload();
        }
    }
    choice(optionLower);

    // Ball accelerate when a block is hit. Speed reset back to normal if lose 1 lives
    var ballAccel = function(){
        if(dx === 2 || dy === -2){
            dx = dx * 1.5;
            dy = dy * 1.5;
            ballSpeed += 15;
        }
        else if(dx === 3 || dy === -3){
            dx = dx * 1.5;
            dy = dy * 1.5;
            ballSpeed += 5;
        }
        else if(dx === 4.5 || dy === -4.5){
            dx = dx * 1.2;
            dy = dy * 1.2;
            ballSpeed += 20;
        }
    }

    var interval = setInterval(moveBall, 8);

    // Check for time remaining
    var countDown = setInterval(function() {
        timer--;
            if (timer < 0) {
            clearInterval(countDown);
            clearInterval(interval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "red";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            alert("Times up");
            var retry = prompt("Do you want to try again? Y/N");
            var retryLower = retry.toLowerCase();
            if(retryLower.includes("y") === true){
                document.location.reload();
            }
            else{
                gameOver();
            }
        }
    }, 1000);
}