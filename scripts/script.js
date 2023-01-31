//TODO:
/*
    -Create events to detect keyboard hits
        and move the paddle accordingly.
    - Class Sprite
    - Class Paddle
    - Create objects
    - final objective move the paddle

*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 564;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
////////////////////////////////////////////////
// ctx.fillStyle = "white";
// ctx.fillRect(canvas.width / 2,canvas.height -60  ,200,25);

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;



//bricks
var rowCount= 10;
var columnCount = 5;
var bricksW = 75;
var bricksH = 20;
var bricksPad = 20;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < columnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function collision() {
  for (var c = 0; c < columnCount; c++) {
    for (var r = 0; r < rowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + bricksW &&
          y > b.y &&
          y < b.y + bricksH
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == rowCount* columnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
        }

        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  // ctx.arc("POS IN X"canvas.width/2, 'POS INcanvas.height - 30'canvas.height-30, ball radius, 0, Math.PI*2);
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#bea925";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < columnCount; c++) {
    for (var r = 0; r < rowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = r * (bricksW + bricksPad) + brickOffsetLeft;
        var brickY = c * (bricksH + bricksPad) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, bricksW, bricksH);
        ctx.fillStyle = "#bea925";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#bea925";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#bea925";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawScore();
  drawLives();
  collision();

  //-ballRadius as when it hits it disapears half of it because we consider the ball from its radius

  // if (y + dy > canvas.height - ballRadius " "
  // || ""y + dy < ballRadius) {   dy = -dy;}

  // Bouncing off the left and right walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Bouncing off the Top and bottom walls
  if (y + dy < ballRadius) {
    //3adet l top
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    //nzlt t7t l bottom

    dy = -dy;
  }

  // tomake the ball move changeable x&y every 10 miliseconds

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
///////////////////////////////////////////////////

const sprite = new Sprite({
  height: 30,
  width: 200,
  position: {
    x: 50,
    y: canvas.height - 60,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});



function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  sprite.velocity.x = 5;
  sprite.update();
}

animate();

/*
update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  */
