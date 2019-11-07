// Decoration
//
// A class that represents the context of the season
// Automn leaves swirle to create a windy effect
// their function is to decorate
// therefore they don't interact with other classes

class Decoration {

  // constructor
  //
  // Set te initial values for the Leaves's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, avatar) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and Speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Timer properties
    this.startTimeReset = 0;
    this.timePassedReset = 0;
    this.interval = 15000; // every 15 seconds
    // Display properties
    this.avatar = avatar;
    // Rotation properties
    this.theta = 0;
    this.thetaT = random(0, 1000);
    this.velTheta = (noise(this.thetaT), 0, 3);
  }

  // move
  //
  // Moves based on the resulting velocity
  move() {
    // Set velocity via speed
    this.vx = this.speed;
    this.vy = this.speed;
    // update position
    this.x += this.vx;
    this.y += this.vy;
  }

  // display
  //
  // Draw the decoration with an image (avatar)
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    this.theta += this.velTheta;
    rotate(this.theta);
    image(this.avatar, 0, 0);
    pop();
  }
}