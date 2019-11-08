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
    this.overlapRate2Catch = 4;
    // Display properties
    this.width = 88 / 2; // initial size of the images
    this.height = this.width;
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
    // Score properties
    this.initialScore = 49;
    this.score = 40;
    this.endScore = 0;
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
    // Check if the distance is less than half of their width
    if (d < this.width / 2 + prey.width / 2) {
      // Decrease prey width when overlap
      prey.width -= this.overlapRate2Catch;
      prey.height = prey.width;
      // Check if the prey died and reset it if so
      if (prey.width < 3 && prey.caught === false) {
        //prey.reset();
        prey.caught = true;
        this.score -= 1;
      }
    }
  }

  // handleCollision
  //
  // Take an Obstacle object as an argument and checks if the predator
  // overlaps it. If so, all the preys appear again.
  handleCollision(obstacle) {
    // Calculate distance from this predator to the obstacle
    let d = dist(this.x, this.y, obstacle.x, obstacle.y);
    // Check if the distance is less than half of their width
    if (d < this.width / 2 + obstacle.width / 2) {
      return true;
    }
    return false;
  }

  // handleWinning
  //
  // Check if the predator has caught all preys or if
  handleWinning() {
    if (this.score === this.endScore) {
      gameOver = true;
    }
  }

  // display
  //
  // Draw the predator with an image related to its direction
  display() {
    // Set the x and y at the CENTER
    push();
    imageMode(CENTER);
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
    pop();
  }

  // displayScore()
  //
  // Display the amount of preys left to catch
  displayScore() {
    // Text properties
    push();
    stroke(100);
    fill(255);
    textSize(22);
    textFont(cursiveFont);
    // Fix position for the text
    let scoreTextX = width - 200;
    let scoreTextY = 30;
    // Distinct the plural and the singular form for the text
    if (mozart.score > 1) {
      let scoreTextPlural = mozart.score + " pages missing";
      text(scoreTextPlural, scoreTextX, scoreTextY);
    } else {
      let scoreTextSingular = mozart.score + " page missing";
      text(scoreTextSingular, scoreTextX, scoreTextY);
    }
    pop();
  }

  // scoreReset()
  //
  // Reset the score if there is a collision with any Obstacles
  scoreReset() {
    this.score = this.initialScore;
  }
}