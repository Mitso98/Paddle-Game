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