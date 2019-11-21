// NightSky
//
// That class represents a night sky full of stars.
// It illustrates the concept of night time.
// It is basically a black rectangle with sparkling stars.

class NightSky {

  // constructor
  //
  // Set the initial values for the NightSky's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, reductionRate, growingRate, bckgrndX, bckgrndY, bckgrndWidth, bckgrndHeight) {
    // Position
    this.x = x;
    this.y = y;
    // Display properties
    this.radius = radius;
    this.reductionRate = reductionRate;
    this.growingRate = growingRate;
    this.changeRate = this.reductionRate;
    this.bckgrndFill = 0;
    this.starFill = 255;
    // Background properties
    this.bckgrndX = bckgrndX;
    this.bckgrndY = bckgrndY;
    this.bckgrndWidth = bckgrndWidth;
    this.bckgrndHeight = bckgrndHeight;
  }

  // Size
  //
  // Reduce and enlarge its size gradually to make it look like its glowing
  size() {

    // If it is no longer visible, make the star grow
    if (this.radius > 1) {
      this.changeRate = this.reductionRate;
    }
    if (this.radius < .2) {
      this.changeRate = this.growingRate;
    }
    this.radius += this.changeRate;
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

  // reset
  //
  // Reset the star position when it is not displaying
  reset() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = random(.3, .8);
  }
}