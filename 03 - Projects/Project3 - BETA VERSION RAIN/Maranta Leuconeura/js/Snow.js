// Snow
//
// That class represents a snownflakes falling down.
// It illustrates the concept of a snowy day.
// The snowflakes will be displayed by subclasses:
// Snowflake1 and Snowflake2

class Snow {

  // constructor
  //
  // Set the initial values for Snow's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedX, speedY, fill) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.radius = radius;
    this.fill = fill;
    // Movemnet properties
    this.speedY = speedY;
    this.speedX = speedX;
    this.tx = random(0, 1000);
    this.vx = 0;
    // Box properties
    this.resetX = -500;
    this.ninthFrameX = 5000; // offsetTargetX + timeFrameInterval * 10
    this.translationRate = 2;
  }

  // gravity
  //
  // Move the snownflakes down using perling noise on the x axis
  gravity() {
    // Move down
    this.y += this.speedY;
    // Ondulate its path to the bottom with noise
    this.vx = map(noise(this.tx), 0, 1, -this.speedX, this.speedX);
    this.x += this.vx;
    // Update time properties
    this.tx += 0.01;
  }
}