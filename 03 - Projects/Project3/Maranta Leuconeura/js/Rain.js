// Rain
//
// That class represents a rainy day.
// It is tiny square that fall down and reappear
// by mean of a HandleWrapping function.

class Rain {

  // constructor
  //
  // Set the initial values for the Rain properties
  // Either sets default values or uses the arguments provided
  constructor(x, y) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display properties
    this.width = 1;
    this.height = random(5, 10);
    this.theta = .45;
    // Create an array of random blue colors
    this.colors = ["#8CDFE8", "#99EDF3", "#BFF4F7", "#D4F1F9"];
    this.randomFillColor = floor(random(0, 1) * this.colors.length);
    this.fillColor = this.colors[this.randomFillColor];
    // Movement properties
    this.speedX = -.2;
    this.speedY = 5;
    // Translation properties
    this.dropTranslationRate = 3;
    this.resetX = -500;
    this.ninthFrameX = 5000; // offsetTargetX + timeFrameInterval * 10
    // Wrapping properties
    this.leftLimit = 1000;
    this.rightLimit = 1500;
    this.boxWidth = 500;
    this.limitsTranslationRate = this.dropTranslationRate;
  }

  // dropDisplay
  //
  // Draw the drop with a tiny rectangle rotated
  dropDisplay() {
    push();
    noStroke();
    fill(this.fillColor);
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.theta);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  // dropGravity
  //
  // Move the drop down
  dropGravity() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // handleWrapping
  //
  // Checks if the drop has gone off the canvas and
  // wraps it to the other side if so (only up and down)
  handleWrapping() {
    // Off the bottom
    if (this.y > height) {
      this.y -= height;
    }
    // // Off the left or right
    // if (this.x < this.leftLimit) {
    //   this.x = this.x + this.boxWidth;
    // } else if (this.x > this.rightLimit) {
    //   this.x = this.x - this.boxwidth;
    // }
    // // Off the top or bottom
    // if (this.y > height) {
    //   this.y -= height;
    // }
  }

  // dropTranslation
  //
  // The drop move to the left following the backgroud
  // Its position is reset to the end of the loop if it is offcanvas
  dropTranslation() {
    this.x -= this.dropTranslationRate;
    if (this.x - 500 < this.resetX) {
      this.x = this.x + this.ninthFrameX;
    }
  }

  // // limitsTranslation
  // //
  // // Make sure that the borders of the box move with the box
  // limitsTranslation() {
  //   this.leftLimit -= this.limitsTranslationRate;
  //   if (this.leftLimit - 500 < this.resetX) {
  //     this.leftLimit = this.leftLimit + this.ninthFrameX;
  //   }
  //   this.rightLimit -= this.limitsTranslationRate;
  //   if (this.rightLimit - 500 < this.resetX) {
  //     this.rightLimit = this.rightLimit + this.ninthFrameX;
  //   }
  // }
}