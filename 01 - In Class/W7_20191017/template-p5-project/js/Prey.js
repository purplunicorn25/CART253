class Prey {
  constructor(x, y, speed, fillColor, radius) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.fillColor = fillColor;
    this.radius = this.health;
    this.health = this.health;
    this.tx = random(0, 100);
    this.ty = random(0, 100);
  }
  move() {
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    this.x += this.vx;
    this.y += this.vy;

    this.tx += 0.01;
    this.ty += 0.01;
    this.handleWrapping(); // Calls the handleWrapping method, note the use of "this"
  }
  handleWrapping() {
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }
}
display() {
  push();
  noStroke();
  fill(this.fillColor);
  this.radius = this.health;
  ellipse(this.x, this.y, this.radius * 2);
  pop();
}
reset() {
  this.health = this.maxHealth;
  this.radius = this.health;
  this.x = random(0, width);
  this.y = random(0, height);
}
}