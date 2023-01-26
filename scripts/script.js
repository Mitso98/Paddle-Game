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
