

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
