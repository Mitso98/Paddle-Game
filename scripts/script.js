//TODO:
/*
    -Create events to detect keyboard hits
        and move the paddle accordingly.
    - Class Sprite
    - Class Paddle
    - Create objects
    - final objective move the paddle

*/

const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
cvs.width = 1024;
cvs.height = 564;
cvs.style.border = "3px solid black";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, cvs.width, cvs.height);
///////////////////////////////////////////////////

let paddleHeight = 7;
let paddleWidth = 70;
let paddleX = (cvs.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const paddle = {
  x: cvs.width / 2 - paddleWidth / 2,
  y: cvs.height - paddleHeight,
  width: paddleWidth,
  height: paddleHeight,
  dx: 6, // delta x paddel speed
};

// DRAW PADDLE
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, cvs.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(r) {
  if (r.key == "Right" || r.key == "ArrowRight") {
    rightPressed = true;
  } else if (r.key == "Left" || r.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(r) {
  if (r.key == "Right" || r.key == "ArrowRight") {
    rightPressed = false;
  } else if (r.key == "Left" || r.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function animate() {
  const id = window.requestAnimationFrame(animate);

  drawPaddle();

  if (rightPressed) {
    paddle
  }
}
