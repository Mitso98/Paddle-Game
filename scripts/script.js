// get live stats
const level = document.getElementById("level");
const live = document.getElementById("lives");
const score = document.getElementById("score");

// Project setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// style canvas
canvas.width = 1024;
canvas.height = 576;

//////////////////////////////////////////////////////////////////
// create objects
const paddle = new Paddle({
  position: {
    x: canvas.width / 2 - GameManager.paddleWidth * 0.5,
    y: canvas.height - 50,
  },
});

const ball = new Ball({
  position: {
    x: canvas.width / 2,
    y: canvas.height - 60,
  },
  velocity: { x: 0, y: 0 },
});

// Create arr of bricks objects
GameManager.drawBricks();

///////////////////////////////////////////////////////////////
// controllers

const keyPressed = {
  a: false,
  w: false,
  d: false,
  s: false,
};

let lastKey;

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
    case "ArrowRight":
      lastKey = "d";
      keyPressed.d = true;
      break;
    case "a":
    case "ArrowLeft":
      lastKey = "a";
      keyPressed.a = true;
      break;
    case " ":
      GameManager.startGame(ball);
      break;
    default:
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
    case "ArrowRight":
      keyPressed.d = false;
      break;
    case "a":
    case "ArrowLeft":
      keyPressed.a = false;
      break;
    default:
      break;
  }
});

/////////////////////////////////////////////////////////////////////////////
// Animation

function animate() {
  const animationId = window.requestAnimationFrame(animate);

  // draw canvas
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // update stats
  level.innerHTML = `<h3>Level: ${GameManager.level}</h3>`;
  live.innerHTML = `<h3>live: ${GameManager.live}</h3>`;
  score.innerHTML = `<h3>score: ${GameManager.score}</h3>`;

  // draw
  for (let i = 0; i < GameManager.bricksArr.length; i++) {
    GameManager.bricksArr[i].draw();
  }

  c.fillStyle = "white";
  paddle.update();
  ball.update();

  // check if brick was hit
  for (let i = 0; i < GameManager.bricksArr.length; i++) {
    if (GameManager.bricksArr[i].isHit(ball)) {
      GameManager.bricksArr.splice(i, 1);
    }
  }

  // add velocity only when conditions are met
  paddle.velocity.x = 0;

  if (
    keyPressed.d &&
    lastKey === "d" &&
    paddle.position.x + paddle.width < canvas.width
  ) {
    paddle.velocity.x = ball.maxSpeed * 0.7;
  } else if (keyPressed.a && lastKey === "a" && paddle.position.x > 0) {
    paddle.velocity.x = ball.maxSpeed * 0.7 * -1;
  }

  paddle.detectObject(ball, animationId);

  // move the ball a long with the paddle if game not started
  if (!GameManager.gameStarted) {
    if (GameManager.level == 1 && GameManager.live == 3) {
      ball.velocity.x = paddle.velocity.x;
    } else {
      ball.velocity.x = paddle.velocity.x * -1;
      ball.velocity.y = 0;
    }
  }

  // detect win
  if (!GameManager.bricksArr.length) {
    if (GameManager.level === 3) {
      GameManager.won = true;
      GameManager.endGame();
    } else {
      // next level
      ball.position.x = paddle.position.x + paddle.width * 0.5;
      ball.position.y = paddle.position.y;
      ball.maxSpeed += 2;
      GameManager.gameStarted = false;
      GameManager.level++;
      GameManager.drawBricks();
    }
  }
}

animate();
