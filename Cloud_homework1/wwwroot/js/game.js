// Coding by Jheng-Hong Wang 2019
// E-mail: workspace2110@gmail.com

// Testing function: Drawing a red square
function redSquare(context) {
    context.beginPath();
    context.rect(40, 80, 100, 100);
    context.fillStyle = "red"/*"#FF0000"*/;
    context.fill();
    context.closePath();
}

// Testing function: Drawing a green circle
function greenCircle(context) {
    context.beginPath();
    context.arc(480, 320, 40, 0, Math.PI * 2, false); // direction of drawing with clockwise
    context.fillStyle = "green";
    context.fill();
    context.closePath();
}

// Testing function: Drawing a blue-stroked empty rectangle
function blueEmptyRectangle(context) {
    context.beginPath();
    context.rect(320, 20, 200, 80);
    context.strokeStyle = "rgba(0, 0, 255, 0.5)";
    context.stroke();
    context.closePath();
}

// Function: Drawing ball
function drawingBall(context, x, y, ballRadius) {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#0095DD"; // #0095DD == primary
    context.fill();
    context.closePath();
}

// Function: Drawing paddle
function drawingPaddle(context, paddleX, paddleY, paddleWidth, paddleHeight) {
    context.beginPath();
    context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    context.fillStyle = "#700070";
    context.fill();
    context.closePath();
}

// Variable: The score of game
var score = 0;

// Function: Drawing score
function drawScore(context) {
    context.font = "16px Arial";
    context.fillStyle = "#000000";
    context.fillText("Score: " + score, 8, 40);
}


var lives = 3; // lives of player

// Function: Drawing lives
function drawLives(context, width) {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Lives: " + lives, width - 65, 20);
}

// Import! This is my older version function
//  Function: Create Start button
function createStartButton(context, func) {
    var button = document.createElement("input");
    button.type = "button";
    button.className = "btn btn-success";
    button.value = "Start";
    button.onclick = func;
    context.appendChild(button);
}

// Import! This is my older version function
//  Function: Create Restart button
function createRestartButton(context, func) {
    var button = document.createElement("input");
    button.type = "button";
    button.className = "btn btn-danger";
    button.value = "Restart";
    button.onclick = func;
    context.appendChild(button);
}

// Function: Start button listener
function start() {
    // Running
    main();
    document.getElementById("startBtn").disabled = true;
}

// Function: Restart button listener
function restart() {
    document.location.reload();
}

// Main function
function main() {
    // Defining data:

    // var canvas = $("#myCanvas");                     // jQuery寫法
    var canvas = document.getElementById("myCanvas"); // 一般寫法

    // context is a variable which stores the 2D rendering context.
    var context = canvas.getContext("2d");

    var x = canvas.width / 2;   // Position of x
    var y = canvas.height - 60; // Position of y

    var randomNumber = Math.floor(Math.random() * 9) + 1;
    var dx = randomNumber > 5 ? randomNumber - 5 : -randomNumber;       // delta of x
    var dy = -4;                                                        // delta of y

    var ballRadius = 20; // Radius of ball

    var paddleWidth = 150;
    var paddleHeight = 20;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var paddleY = canvas.height - paddleHeight;

    var rightPressed = false;
    var leftPressed = false;

    // For bricks
    var brickRowCount = 6;      // Row count of bricks
    var brickColumnCount = 5;  // Columnt count of bricks
    var brickWidth = 150;       // Width of bricks
    var brickHeight = 30;       // Height of bricks
    var brickPadding = 10;      // The padding between bricks
    var brickOffsetTop = 60;    // Top offset
    // Left and Right offset
    var brickOffsetLeft = (canvas.width - brickColumnCount * brickWidth - (brickColumnCount - 1) * brickPadding)/2;

    // Creating bricks
    var bricks = [];
    for (var c = 0; c < brickColumnCount; ++c) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; ++r) {
            bricks[c][r] = { x: 0, y: 0, islive: true };
        }
    }

    // Add event listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    var interval = setInterval(draw, 10); // Doing function "draw" every 10 miliseconds
    // -----------------------------------

    // Inside function: Event listener - When key down
    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            leftPressed = true;
        }
    }
    // Inside function: Event listener - When key up
    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            leftPressed = false;
        }
    }

    // Inside function: Drawing bricks
    function drawBricks() {
        for (var c = 0; c < brickColumnCount; ++c) {
            for (var r = 0; r < brickRowCount; ++r) {
                if (bricks[c][r].islive === true) {
                    var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    context.beginPath();
                    context.rect(brickX, brickY, brickWidth, brickHeight);
                    context.fillStyle = "#0071DD";
                    context.fill();
                    context.closePath();
                }
            }
        }
    }

    // Inside function: Detecting Collision
    function collisionDetection() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                // calculations
                if (b.islive === true) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.islive = false;
                        ++score;
                        if (score === brickRowCount * brickColumnCount) {
                            context.font = "30px Comic Sans MS";
                            context.fillStyle = "gold";
                            context.textAlign = "center";
                            context.fillText("YOU WIN !!", canvas.width / 2, canvas.height / 2);
                            clearInterval(interval); // Needed for Chrome to end game
                        }
                    }
                }
            }
        }
    }

    // Insde function: drawing game screen
    function draw() {
        // Clear previous screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Drawing Bricks
        drawBricks();
        // Drawing ball
        drawingBall(context, x, y, ballRadius);
        // Drawing paddle
        drawingPaddle(context, paddleX, paddleY, paddleWidth, paddleHeight);
        // Drawing score
        drawScore(context);
        // Drawing lives
        drawLives(context, canvas.width);
        // Detecting Collision
        collisionDetection();


        // Bouncing off the left and right(左右反彈)
        if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
            dx = -dx;
        }
        // Bouncing off the top and bottom(上下反彈)
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                --lives;
                // Drawing lives
                drawLives(context, canvas.width);
                if (!lives) {
                    context.font = "30px Comic Sans MS";
                    context.fillStyle = "red";
                    context.textAlign = "center";
                    context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
                    clearInterval(interval); // Needed for Chrome to end game
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 60;
                    dx = randomNumber > 5 ? randomNumber - 5 : -randomNumber;
                    dy = -4;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 14;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 14;
        }

        x += dx; // Updating position of x
        y += dy; // Updating position of y
    }
}