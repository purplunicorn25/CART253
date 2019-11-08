// Decoration
//
// A class that represents the context of the season
// Every once in a while it while rain and leave a pond of water
class Decoration {

  // constructor
  //
  // Set te initial values for the decoration properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Timer properties
    this.startTime;
    this.timePassed;
    this.interval = 15000; // every 15 seconds
    // Display properties
    this.radius = radius;
    this.sizeReductionSpeed = 0.3;
    this.raining = false;
    // Create an array of random blue colors
    this.colors = ["#8CDFE8", "#99EDF3", "#BFF4F7", "#D4F1F9"];
    this.randomFillColor = floor(random(0, 1) * this.colors.length);
    this.fillColor = this.colors[this.randomFillColor];
  }

  // reduceSize
  //
  // Reduce its size gradually to make it look like its falling down
  reduceSize() {
    this.radius -= this.sizeReductionSpeed;
    // If it is no longer visible reset the decoration
    if (this.radius < 0) {
      this.reset();
    }
  }

  // resetSize
  //
  // Reset the decoration properties
  reset() {
    this.radius = random(5, 10);
    this.x = random(0, 1000);
    this.y = random(0, 500);
  }

  // display
  //
  // Draw the decoration with an ellipse
  display() {
    // Display only if raining is true
    if (this.raining === true) {
      push();
      noStroke();
      fill(this.fillColor)
      ellipse(this.x, this.y, this.radius, this.radius)
      pop();
    }
  }
}