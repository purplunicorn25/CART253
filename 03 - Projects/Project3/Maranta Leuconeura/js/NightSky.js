// NightSky
//
// That class represent a night sky full of stars.
// It illustrates the concept of night time.
// It is basically a black rectangle with sparkling stars.

class NightSky {

  // constructor
  //
  // Set the initial values for the NightSky's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, bckgrndX, bckgrndY, bckgrndWidth, bckgrndHeight) {
    // Position
    this.x = x;
    this.y = y;
    // Display properties
    this.radius = radius;
    this.reductionRate = 0.03;
    this.bckgrndFill = 0;
    this.starFill = 255;
    // Background properties
    this.bckgrndX = bckgrndX;
    this.bckgrndY = bckgrndY;
    this.bckgrndWidth = bckgrndWidth;
    this.bckgrndHeight = bckgrndHeight;
  }

  // reduceSize
  //
  // Reduce its size gradually to make it look like its glowing
  reduceSize() {
    this.radius -= this.reductionRate;
    // If it is no longer visible reset the star
    if (this.radius < 0) {
      this.reset();
    }
  }

  // resetSize
  //
  // Reset the star properties
  reset() {
    this.radius = random(1, 3);
    this.x = random(100, 400);
    this.y = random(0, 600);
  }

  // display
  //
  // Draw the star with an ellipse
  display() {
    push();
    noStroke();
    fill(this.starFill);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

  // backgroundDisplay
  //
  // Draw the background as a rectangle
  backgroundDisplay() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.bckgrndFill);
    rect(this.bckgrndX, this.bckgrndY, this.bckgrndWidth, this.bckgrndHeight);
    pop();
  }
}