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
  constructor(x, y, speed, maxHealth, avatarE, avatarW, avatarN, avatarS, avatarNE, avatarSE, avatarNW, avatarSW) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = maxHealth;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.avatarE = avatarE;
    this.avatarW = avatarW;
    this.avatarN = avatarN;
    this.avatarS = avatarS;
    this.avatarNE = avatarNE;
    this.avatarSE = avatarSE;
    this.avatarNW = avatarNW;
    this.avatarSW = avatarSW;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // move
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
    this.health = constrain(this.health, 0, this.maxHealth);
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
        prey.reset();
      }
    }
  }

  // display
  //
  // Draw the predator with an image related to its direction
  display() {

    // Print different images according to the key pressed (directions)
    if (keyIsDown(this.rightKey) && keyIsDown(this.upKey)) {
      image(this.avatarNE, this.x, this.y);
    } else if (keyIsDown(this.rightKey) && keyIsDown(this.downKey)) {
      image(this.avatarSE, this.x, this.y);
    } else if (keyIsDown(this.leftKey) && keyIsDown(this.upKey)) {
      image(this.avatarNW, this.x, this.y);
    } else if (keyIsDown(this.leftKey) && keyIsDown(this.downKey)) {
      image(this.avatarSW, this.x, this.y);
    } else if (keyIsDown(this.rightKey)) {
      image(this.avatarE, this.x, this.y);
    } else if (keyIsDown(this.leftKey)) {
      image(this.avatarW, this.x, this.y);
    } else if (keyIsDown(this.upKey)) {
      image(this.avatarN, this.x, this.y);
    } else if (keyIsDown(this.downKey)) {
      image(this.avatarS, this.x, this.y);
    } else {
      image(this.avatarE, this.x, this.y);
    }
  }
}