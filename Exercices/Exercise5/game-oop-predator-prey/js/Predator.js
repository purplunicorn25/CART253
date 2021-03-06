// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, avatar, radius, upKey, downKey, leftKey, rightKey, sprintKey, scoreX, scoreY, scoreChangeRed, scoreChangeGreen, scoreChangeBlue) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.turboSpeed = speed * 2;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.05;
    this.healthGainPerEat = 1;
    // Display properties
    this.avatar = avatar;
    this.radius = this.health; // Radius is defined in terms of health
    // Score display properties ( impacting background)
    this.startingColor = 255;
    this.scoreChangeRed = scoreChangeRed;
    this.scoreChangeGreen = scoreChangeGreen;
    this.scoreChangeBlue = scoreChangeBlue;
    this.colorRed = 255;
    this.colorGreen = 255;
    this.colorBlue = 255;
    // background display properties (responding to score)
    this.scoreX = scoreX;
    this.scoreY = scoreY;
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement & sprint
    if (keyIsDown(this.leftKey) && keyIsDown(this.sprintKey)) {
      this.vx = -this.turboSpeed;
    } else if (keyIsDown(this.rightKey) && keyIsDown(this.sprintKey)) {
      this.vx = this.turboSpeed;
    } else if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement & sprint
    if (keyIsDown(this.upKey) && keyIsDown(this.sprintKey)) {
      this.vy = -this.turboSpeed;
    } else if (keyIsDown(this.downKey) && keyIsDown(this.sprintKey)) {
      this.vy = this.turboSpeed;
    } else if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // moves
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 1, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        // Adjust the color according to the prey eaten of the player
        this.colorRed = constrain(this.colorRed, 0, 255);
        this.colorGreen = constrain(this.colorGreen, 0, 255);
        this.colorBlue = constrain(this.colorBlue, 0, 255);
        // Reduce the color value
        this.colorRed += this.scoreChangeRed;
        this.colorGreen += this.scoreChangeGreen;
        this.colorBlue += this.scoreChangeBlue;
        // reset the preys for predators to eat more
        prey.reset();
      }
    }
  }

  // scoreDisplay()
  //
  // Divide the screen in three and every rectangle represents the score of a player
  scoreDisplay() {
    fill(this.colorRed, this.colorGreen, this.colorBlue);
    rect(this.scoreX, this.scoreY, width / 3, height);
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    image(this.avatar, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }
}