// Abstract class
class Sprite {
  constructor({
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    width = GameManager.paddleWidth,
    height = GameManager.paddleHieght,
  }) {
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
  }
  draw() {
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Paddle extends Sprite {
  constructor({ position, velocity, width, height }) {
    super({ position, velocity, width, height });
  }
  detectObject(ball, animationID) {
    // detect ball
    if (
      ball.position.x >= this.position.x &&
      ball.position.x <= this.position.x + this.width &&
      this.position.y <= ball.position.y
    ) {
      this.determineAngelForPaddel(ball);
      ball.reverseBallDirction();
    }
    //detect boundries could be added to ball class
    else if (
      ball.position.y <= 0 ||
      ball.position.x <= 0 ||
      ball.position.x >= canvas.width
    ) {
      // I will reverse direction inside this function
      // as I need to customise this
      this.determineAngelForBoundries(ball);
    } else if (ball.position.y > this.position.y) {
      //TODO: implement game over function
      GameManager.endGame(animationID);
      return true;
    }
  }
  // will be called by detectObject
  determineAngelForPaddel(ball) {
    // paddle width is 150
    // sides 1 2 3 4 5 6
    // when the ball hit side  (1)
    // 0 to 25
    if (
      ball.position.x >= this.position.x &&
      ball.position.x <= this.position.x + this.width / 6
    ) {
      ball.hitBy = "side1";
      ball.velocity.x = ball.maxSpeed * 0.8;
      ball.velocity.y = ball.maxSpeed * 0.2;
    }
    // when the ball hit side (2)
    // 26 to 50
    else if (
      ball.position.x >= this.position.x + this.width / 6 + 1 &&
      ball.position.x <= this.position.x + (this.width / 6) * 2
    ) {
      ball.hitBy = "side2";
      ball.velocity.x = ball.maxSpeed * 0.6;
      ball.velocity.y = ball.maxSpeed * 0.4;
    }
    // when the ball hit side (3)
    // 51 to 75
    else if (
      ball.position.x >= this.position.x + (this.width / 6) * 2 + 1 &&
      ball.position.x <= this.position.x + (this.width / 6) * 3
    ) {
      ball.hitBy = "side3";
      ball.velocity.y = ball.maxSpeed / 2;
      ball.velocity.x = 2;
    }
    // when the ball hit side (4)
    // 76 to 100
    else if (
      ball.position.x >= this.position.x + (this.width / 6) * 3 + 1 &&
      ball.position.x <= this.position.x + (this.width / 6) * 4
    ) {
      ball.hitBy = "side4";
      ball.velocity.x = ball.maxSpeed * 0.45 * -1;
      ball.velocity.y = ball.maxSpeed * 0.55;
    }
    // when the ball hit side (5)
    // 101 to 125
    else if (
      ball.position.x >= this.position.x + (this.width / 6) * 4 + 1 &&
      ball.position.x <= this.position.x + (this.width / 6) * 5
    ) {
      ball.hitBy = "side5";
      ball.velocity.x = ball.maxSpeed * 0.7 * -1;
      ball.velocity.y = ball.maxSpeed * 0.3;
    }
    // when the ball hit side (6)
    // 126 to 150
    else if (
      ball.position.x >= this.position.x + (this.width / 6) * 5 + 1 &&
      ball.position.x <= this.position.x + (this.width / 6) * 6
    ) {
      ball.hitBy = "side6";
      ball.velocity.x = ball.maxSpeed * 0.8 * -1;
      ball.velocity.y = ball.maxSpeed * 0.2;
    }
  }
  //TODO:
  determineAngelForBoundries(ball) {
    if (ball.position.x <= 0) {
      switch (ball.hitBy) {
        case "top":
          ball.velocity.x *= -1;
          break;
        case "right":
          ball.velocity.x *= -1;
          break;

        default:
          ball.velocity.x *= -1;

          break;
      }
      ball.hitBy = "left";
    } else if (ball.position.x >= canvas.width) {
      switch (ball.hitBy) {
        case "top":
          ball.velocity.x *= -1;
          break;

        case "left":
          ball.velocity.x *= -1;
          break;

        default:
          ball.velocity.x *= -1;
          break;
      }
      ball.hitBy = "right";
    } else if (ball.position.y <= 0) {
      console.log(ball.hitBy);
      console.log(ball.velocity.x, ball.velocity.y);
      switch (ball.hitBy) {
        // when the ball touches the 90 degree
        // it touches both right and top
        // this condition "top" fix that
        case "top":
          ball.velocity.x *= -1;
          break;
        case "right":
          ball.velocity.y *= -1;
          break;
        case "left":
          ball.velocity.y *= -1;
          break;
        case "side1":
        case "side2":
          ball.velocity.x *= -1;
          break;
        case "side3":
        case "side4":
        case "side5":
        case "side6":
          ball.velocity.y *= -1;
          break;
        default:
          ball.velocity.y *= -1;
          break;
      }
      ball.hitBy = "top";
    }
  }
}