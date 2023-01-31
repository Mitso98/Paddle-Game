class Sprite {
  constructor({ position, velocity, width, height }) {
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}



