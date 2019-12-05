// Snowflake1
//
// That class represents a tiny round snowflake falling down
// It illustrates the concept of a snowy day.

class Snowflake1 extends Snow {

  // constructor
  //
  // Set the initial values for Snowflake1's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, radius, speedX, speedY, fill) {
    super(x, y, radius, speedX, speedY, fill);
  }

  // gravity
  //
  // Move the snownflakes down using perling noise on the x axis
  gravity() {
    super.gravity();
  }

  // display
  //
  // Draw the snowflakes1 with a tiny ellipse
  display() {
    push();
    noStroke();
    fill(this.fill);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}