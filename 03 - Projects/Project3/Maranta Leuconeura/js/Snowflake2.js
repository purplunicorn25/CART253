// Snowflake2
//
// That class represents a crystallized snowflake falling down
// It illustrates the concept of a snowy day.

class Snowflake2 extends Snow {

  // constructor
  //
  // Set the initial values for Snowflake2's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedX, speedY, fill) {
    super(x, y, radius, speedX, speedY, fill);
    // Display properties
    this.width = 1.5;
    this.height = 10;
    // Rotation properties
    this.theta = PI / 4;
  }

  // gravity
  //
  // Move the snownflakes down using perling noise on the x axis
  gravity() {
    super.gravity();
  }

  // display
  //
  // Draw the snowflakes2 with a tiny rectangle flipped around its center
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.fill);
    translate(this.x, this.y);
    rect(this.x, this.y, this.width, this.height);
    rotate(this.theta);
    rect(this.x, this.y, this.width, this.height);
    rotate(this.theta / 2);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}