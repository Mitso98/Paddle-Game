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
var xi= canvas.width / 2;
var yi= canvas.height - 30;
var dix = 10;
var diy = -10;



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
    bricks[c][r] = { xi: 0, yi: 0, status: 1 };
  }
}

function collision() {
  for (var c = 0; c < columnCount; c++) {
    for (var r = 0; r < rowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
         xi> b.xi &&
         xi< b.xi + bricksW &&
          yi> b.yi &&
          yi< b.yi + bricksH
        ) {
          diy = -diy;
          b.status = 0;
          score++;
          if (score == (rowCount* columnCount)+1) {
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
  ctx.arc(xi, yi, ballRadius, 0, Math.PI * 2);
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
        bricks[c][r].xi= brickX;
        bricks[c][r].yi= brickY;
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

  // if (y + diy > canvas.height - ballRadius " "
  // || ""y + diy < ballRadius) {   diy = -dy;}

  // Bouncing off the left and right walls
  if (xi + dix > canvas.width - ballRadius ||xi+ dix < ballRadius) {
    dix = -dix;
  }

  // Bouncing off the Top and bottom walls
  if (yi + diy < ballRadius) {
    //3adet l top
    diy = -diy;
  } else if (yi + diy > canvas.height - ballRadius) {
    //nzlt t7t l bottom

    diy = -diy;
  }

  // tomake the ball move changeable x&y every 10 miliseconds

 xi+= dix;
  yi+= diy;
  requestAnimationFrame(draw);
}

draw();
