/** @type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 500);

const numberOfEnemies = 30;
const enemiesArray = [];

let gameFrame = 0;
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy4.png";
    this.mouseX = 0;
    this.mouseY = 0;
    this.trackMouse();

    this.mouseY = 0;
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.newX = Math.random() * canvas.width;
    this.newY = Math.random() * canvas.width;
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  trackMouse() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }
  update() {
    // if (gameFrame % this.interval === 0) {
    //   this.newX = Math.random() * (canvas.width - this.width);
    //   this.newY = Math.random() * (canvas.width - this.width);
    // }
    // let dx = this.x - this.newX;
    // let dy = this.y - this.newY;
    // this.x -= dx / 20;
    // this.y -= dy / 20;
    let dx = this.mouseX - this.x;
    let dy = this.mouseY - this.y;

    this.x += dx * this.speed;
    this.y += dy * this.speed;
    // let distance = Math.sqrt(dx * dx + dy * dy) / 5;
    // console.log(dx, dy, distance);
    // Move the enemy towards the mouse with a certain speed

    if (this.x + this.width < 0) this.x = canvas.width;
    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
// const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //   enemy1.update();
  //   enemy1.draw();
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
