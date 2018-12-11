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
        createName();
        createScore();
        createLives();
        createBricks();
        createBall();
        createPaddle();
        collision();
        // Calculate the collision at the edge of the paddle
        var paddleDistX = Math.abs(x - paddle - paddleWidth / 2);
        var paddleColX = paddleDistX - paddleWidth / 2;
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
            if(x > paddle && x < paddle + paddleWidth || (paddleColX * paddleColX < (ballRadius * ballRadius))){
                dy = -dy;
            }
            else {
                // Check for how many lives when 0 end the game
                lives--;
                if(lives === 0){
                    // Stop ball from moving and show game over screen
                    gameOver();
                    clearInterval(interval);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "red";
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "red";
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    document.querySelector('.endgame-lose').addEventListener("click", function(){
                        document.location.reload();
                    });
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
            paddle += 7;
        }
        else if(leftPressed && paddle > 0){
            paddle -= 7;
        }
    }

    // Detect collision for every brick in row and column
    function collision(){
        for(var i = 0; i < brickCol; i++){
            for(var j = 0; j < brickRow; j++){
                var brickObj = bricksArr[i][j];
                // Check if ball collide with brick if so ball bounce back and brick disappear
                if(brickObj.appearance === true){
                    if(x > brickObj.x && x < brickObj.x + brickWidth && y > brickObj.y && y < brickObj.y + brickHeight || ((x * x + y * y) < (ballRadius * ballRadius))){
                        dy = -dy;
                        brickObj.appearance = false;
                        score++;
                        ballAccel();
                            // Check if all bricks disappear from canvas to declare win
                            if(score === brickRow * brickCol){
                                win();
                                clearInterval(interval);
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = "red";
                                ctx.lineWidth = 3;
                                ctx.strokeStyle = "red";
                                ctx.strokeRect(0, 0, canvas.width, canvas.height);
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
    }

    // Create win screen
    var win = function(){
        var winBox = document.createElement('div');
        winBox.setAttribute("class", "endgame-win");
        winBox.innerHTML = "Congratulation!<br><span>You beat the game<br>Click here to retry</span></span><br><br>" + "<span>" + userName + "</span><br>" + "<span>Score: </span>" + score + " " + "<span>---</span>" + " " + "<span>Lives: </span>" + lives;
        document.body.appendChild(winBox);
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
            document.location.reload();
        }
    }
    choice(optionLower);


    // Ball accelerate when a block is hit. Speed reset back to normal if lose 1 lives
    var ballAccel = function(){
        if(dx === 2 || dy === -2){
            dx = dx * 1.5;
            dy = dy * 1.5;
        }
        else if(dx === 3 || dy === -3){
            dx = dx * 1.5;
            dy = dy * 1.5;
        }
        else if(dx === 4.5 || dy === -4.5){
            dx = dx * 1.2;
            dy = dy * 1.2;
        }
    }

    var interval = setInterval(moveBall, 8);

    // var ballAccel = function() {
    //     console.log(dx);
    //     console.log(dy);
    //     if(dx < 7 && dy < 7) {
    //         dx += 2;
    //         dy += 2;
    //     }
    //     else{
    //         dx = 7;
    //         dx = 7;
    //     }
    // }
}