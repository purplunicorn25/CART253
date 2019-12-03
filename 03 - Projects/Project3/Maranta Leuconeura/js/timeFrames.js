// TimeFrames
//
// BLA BLA

class TimeFrames {

  // constructor
  //
  // Set the initial values for the timeFrames' properties
  // Either sets default values or uses the arguments provided
  constructor(x, color) {
    // Position properties
    this.x = x;
    this.y = 0;
    // Display properties
    this.color = color;
    this.width = 500;
    this.height = 600;
    // Moving properties
    this.boxTranslationRate = 5;
    this.ninthFrameX = 4500; // offsetTargetX + timeFrameInterval * 9
    this.resetX = -499;
  }

  // background
  //
  // Size and shape of the box object
  box() {
    push();
    rectMode(CORNER);
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop()
  }

  // boxTranslation
  //
  // The box move to the left at a slow pace
  boxTranslation() {
    this.x -= this.boxTranslationRate;
    if (this.x < this.resetX) {
      this.x = this.ninthFrameX;
    }
  }

}