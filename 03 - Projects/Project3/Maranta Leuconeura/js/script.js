let windowWall;

let offsetTargetX = 0;
let timeFrameInterval = 500;
let translationRate = 6;

// TIME FRAMES
let sun0; // 0 - 400
let night1; // 500 - 1000
let rain2; // 1000 - 1500
let night3; // 1500 - 2000
let sun4; // 2000 - 2500
let night5; // 2500 - 3000
let snow6 // 3000 - 3500
let night7; // 3500 - 4000
let rain8; // 4000 - 4500
let night9; // 4500 - 5000
// Empty array to store them in
let weather = [];

// NIGHTSKY
// Define how many star are to be displayed
let numStars = 500;
// Empty arrays to store stars in for everynight
let stars1 = [];
let stars3 = [];
let stars5 = [];
let stars7 = [];
let stars9 = [];

// RAIN
// Define how may drops are to be displayed
let numDrops = 1000;
// Empty arrays to store drops in
let drops = [];
let drops8 = [];

// SUN
let sun;
let rays;
let secondSun;
let secondRays;

// SNOW
// Define how many snownflakes are to be displayed
let numSnowflakes1 = 500;
let numSnowflakes2 = 150;
// Empty arrays to store snownflakes in
let snowflakes1D5 = [];
let snowflakes2D5 = [];
let snowflakes1D6 = [];
let snowflakes2D6 = [];

// PLANT
// Define how many leaves the plant has
let numLeaves = 9;
// An empty array to store leaves in
let leaves = [];
// Image array for its avatars
let leafAvatars = [];

// OTHER IMAGES
// mouse avatar
let fly;

// preload()
//
// Load assets before the game starts
function preload() {
  // Wall
  windowWall = loadImage("assets/images/window.png");
  // Mouse Avatar
  fly = loadImage("assets/images/fly.png");
  // Leaves
  for (let i = 0; i < 9; i++) {
    let fileName = "assets/images/leaves/leaf" + i + ".png";
    leafAvatars.push(loadImage(fileName));
  }
}

// setup()
//
// Sets up a canvas
// Creates objects for the plant and outdoor scenes
function setup() {
  createCanvas(500, 600);
  // TIMEFRAMES
  // Set the initial boxes and store them into an array
  setupTimeFrames();
  // NIGHT
  // Set the initial position and properties of the stars
  setupNight();
  // RAIN
  // Set the initial position and properties of the drops
  setupRain();
  // SUN
  // Set the initial position and properties of sun
  setupSun();
  // SNOW
  // Set the initial position and properties of snownflakes
  setupSnow();
  // PLANT
  // Set the inital position and properties of the leaves
  setupPlant();
}

// draw()
//
// Handles sceneries, movement and interractions
// The game starts, the player plays and the game ends
function draw() {
  // BEHIND THE WALL
  // All the sceneries are updated at the same time
  // They are displayed and move to the left in an infinite loop
  // BOXES
  displayTimeFrames();
  // NIGHT
  displayNight();
  // RAIN
  displayRain();
  // SUN
  displaySun();
  // SNOW
  displaySnow();

  // THE WALL
  // Update the wall background as the game runs
  // After all the outdoor scenes
  wallCanvas();

  // IN FRONT OF THE WALL
  mouseAvatar();
  displayPlant();

}

// setupNightSky()
//
// Set the initial position and properties of the stars
function setupNight() {
  // NIGHT1
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the Night constructor
    let bckgrndX = 0;
    let bckgrndColor = color(0);
    let starX = random(500, 1000); // night2
    let starY = random(0, height);
    let moonX = 800;
    let moonY = 300;
    let starRadius = random(.3, .8);
    let reductionRate = random(-0.02, -0.005);
    let growingRate = 0.01;
    // Create a new Night object with the random values
    let newStar = new Night(starX, starY, moonX, moonY, starRadius, reductionRate, growingRate, translationRate);
    // Add the new star to the array
    stars1.push(newStar);
  }
  // NIGHT3
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the Night constructor
    let bckgrndX = 0;
    let bckgrndColor = color(0);
    let starX = random(1500, 2000); // night2
    let starY = random(0, height);
    let moonX = 1800;
    let moonY = 300;
    let starRadius = random(.3, .8);
    let reductionRate = random(-0.02, -0.005);
    let growingRate = 0.01;
    // Create a new Night object with the random values
    let newStar = new Night(starX, starY, moonX, moonY, starRadius, reductionRate, growingRate, translationRate);
    // Add the new star to the array
    stars3.push(newStar);
  }
  // NIGHT5
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the Night constructor
    let bckgrndX = 0;
    let bckgrndColor = color(0);
    let starX = random(2500, 3000); // night2
    let starY = random(0, height);
    let moonX = 2800;
    let moonY = 300;
    let starRadius = random(.3, .8);
    let reductionRate = random(-0.02, -0.005);
    let growingRate = 0.01;
    // Create a new Night object with the random values
    let newStar = new Night(starX, starY, moonX, moonY, starRadius, reductionRate, growingRate, translationRate);
    // Add the new star to the array
    stars5.push(newStar);
  }
  // NIGHT7
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the Night constructor
    let bckgrndX = 0;
    let bckgrndColor = color(0);
    let starX = random(3500, 4000); // night2
    let starY = random(0, height);
    let moonX = 3800;
    let moonY = 300;
    let starRadius = random(.3, .8);
    let reductionRate = random(-0.02, -0.005);
    let growingRate = 0.01;
    // Create a new Night object with the random values
    let newStar = new Night(starX, starY, moonX, moonY, starRadius, reductionRate, growingRate, translationRate);
    // Add the new star to the array
    stars7.push(newStar);
  }
  // NIGHT9
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the Night constructor
    let bckgrndX = 0;
    let bckgrndColor = color(0);
    let starX = random(4500, 5000); // night2
    let starY = random(0, height);
    let moonX = 4800;
    let moonY = 300;
    let starRadius = random(.3, .8);
    let reductionRate = random(-0.02, -0.005);
    let growingRate = 0.01;
    // Create a new Night object with the random values
    let newStar = new Night(starX, starY, moonX, moonY, starRadius, reductionRate, growingRate, translationRate);
    // Add the new star to the array
    stars9.push(newStar);
  }
}

// displayNight()
//
// Display the stars and the moon of the night sky
function displayNight() {
  // NIGHT1
  // Display, resize and move all the stars
  for (let i = 0; i < stars1.length; i++) {
    stars1[i].starSize();
    stars1[i].starDisplay();
    stars1[i].starTranslation();
  }
  // Display and move the moon according to one lucky star
  stars1[7].moonDisplay();
  stars1[7].moonTranslation();

  // NIGHT3
  // Display, resize and move all the stars
  for (let i = 0; i < stars3.length; i++) {
    stars3[i].starSize();
    stars3[i].starDisplay();
    stars3[i].starTranslation();
  }
  // Display and move the moon according to one lucky star
  stars3[7].moonDisplay();
  stars3[7].moonTranslation();

  // NIGHT5
  // Display, resize and move all the stars
  for (let i = 0; i < stars5.length; i++) {
    stars5[i].starSize();
    stars5[i].starDisplay();
    stars5[i].starTranslation();
  }
  // Display and move the moon according to one lucky star
  stars5[7].moonDisplay();
  stars5[7].moonTranslation();

  // NIGHT7
  // Display, resize and move all the stars
  for (let i = 0; i < stars7.length; i++) {
    stars7[i].starSize();
    stars7[i].starDisplay();
    stars7[i].starTranslation();
  }
  // Display and move the moon according to one lucky star
  stars7[7].moonDisplay();
  stars7[7].moonTranslation();

  // NIGHT9
  // Display, resize and move all the stars
  for (let i = 0; i < stars9.length; i++) {
    stars9[i].starSize();
    stars9[i].starDisplay();
    stars9[i].starTranslation();
  }
  // Display and move the moon according to one lucky star
  stars9[7].moonDisplay();
  stars9[7].moonTranslation();
}

// setupRain()
//
// Set the initial position and properties of the rain
function setupRain() {
  for (let i = 0; i < numDrops; i++) {
    // Generate values for the arguments of the Rain constructor
    let dropX = random(1000, 1500);
    let dropY = random(0, height);
    // Create a new Rain object with the values
    let newDrop = new Rain(dropX, dropY, translationRate);
    // Add the new drop to the array
    drops.push(newDrop);
  }
  for (let i = 0; i < numDrops; i++) {
    // Generate values for the arguments of the Rain constructor
    let dropX = random(4000, 4500);
    let dropY = random(0, height);
    // Create a new Rain object with the values
    let newDrop = new Rain(dropX, dropY, translationRate);
    // Add the new drop to the array
    drops8.push(newDrop);
  }
}

// displayNight()
//
// Display the drops of the rain
function displayRain() {
  // Display, resize and move all the drops
  for (let i = 0; i < drops.length; i++) {
    drops[i].dropDisplay();
    drops[i].dropGravity();
    drops[i].handleWrapping();
    drops[i].dropTranslation();
  }
  // Display, resize and move all the drops
  for (let i = 0; i < drops8.length; i++) {
    drops8[i].dropDisplay();
    drops8[i].dropGravity();
    drops8[i].handleWrapping();
    drops8[i].dropTranslation();
  }
}

// setupSun()
//
// Set the inital position and properties of the sunny sky
function setupSun() {
  // Create a sun and its rays as Sun objects
  // DAY0
  sun = new Sun(220, 200, 100, -.05, .05, 100, 90, color(255, 255, 0), translationRate);
  rays = new Sun(220, 200, 150, -1, 1, 180, 120, color(255, 255, 0, 80), translationRate);
  // DAY4
  secondSun = new Sun(2220, 200, 100, -.05, .05, 100, 90, color(255, 255, 0), translationRate);
  secondRays = new Sun(2220, 200, 150, -1, 1, 180, 120, color(255, 255, 0, 80), translationRate);
}

// displaySun()
//
// Display the sun and its rays
function displaySun() {
  // DAY0
  // Display the sun and its functionalities
  sun.display();
  sun.resize();
  sun.translation();
  // Display the rays and their functionalities
  rays.display();
  rays.resize();
  rays.translation();
  // DAY4
  // Display the sun and its functionalities
  secondSun.display();
  secondSun.resize();
  secondSun.translation();
  // Display the rays and their functionalities
  secondRays.display();
  secondRays.resize();
  secondRays.translation();
}

// setupSnow()
//
// Set the inital position and properties of the snownflakes
function setupSnow() {
  // DAY5
  for (let i = 0; i < numSnowflakes1; i++) {
    // Generate mostly random values for the arguments of the Snow constructor
    let snowX = random(2500, 3000);
    let snowY = random(0, height);
    let snowRadius = random(.8, 1.8);
    let snowSpeedY = .7;
    let snowFill = color(255);
    // Create a new Snow object with the values
    let newSnow = new Snowflake1(snowX, snowY, snowRadius, snowSpeedY, snowFill, translationRate);
    // Add the new snowflake to the array
    snowflakes1D5.push(newSnow);
  }
  // SNOWFLAKE2
  for (let i = 0; i < numSnowflakes2; i++) {
    // Generate mostly random values for the arguments of the Snow constructor
    let snowX = random(2500, 3000);
    let snowY = random(0, height);
    let snowRadius = random(.8, 1.8);
    let snowSpeedY = .7;
    let snowFill = color(255);
    // Create a new Snow object with the values
    let newSnow = new Snowflake2(snowX, snowY, snowRadius, snowSpeedY, snowFill, translationRate);
    // Add the new snowflake to the array
    snowflakes2D5.push(newSnow);
  }
  // DAY6
  // SNOWFLAKE1
  for (let i = 0; i < numSnowflakes1; i++) {
    // Generate mostly random values for the arguments of the Snow constructor
    let snowX = random(3000, 3500);
    let snowY = random(0, height);
    let snowRadius = random(.8, 1.8);
    let snowSpeedY = .7;
    let snowFill = color(255);
    // Create a new Snow object with the values
    let newSnow = new Snowflake1(snowX, snowY, snowRadius, snowSpeedY, snowFill, translationRate);
    // Add the new snowflake to the array
    snowflakes1D6.push(newSnow);
  }
  // SNOWFLAKE2
  for (let i = 0; i < numSnowflakes2; i++) {
    // Generate mostly random values for the arguments of the Snow constructor
    let snowX = random(3000, 3500);
    let snowY = random(0, height);
    let snowRadius = random(.8, 1.8);
    let snowSpeedY = .7;
    let snowFill = color(255);
    // Create a new Snow object with the values
    let newSnow = new Snowflake2(snowX, snowY, snowRadius, snowSpeedY, snowFill, translationRate);
    // Add the new snowflake to the array
    snowflakes2D6.push(newSnow);
  }
}

// displaySnow()
//
// Display the snowflakes of the snowy day
function displaySnow() {
  // DAY6
  // SNOWFLAKE1
  for (let i = 0; i < snowflakes1D6.length; i++) {
    snowflakes1D6[i].gravity();
    snowflakes1D6[i].display();
    snowflakes1D6[i].handleWrapping();
    snowflakes1D6[i].translation();
  }
  // SNOWFLAKE2
  for (let i = 0; i < snowflakes2D6.length; i++) {
    snowflakes2D6[i].gravity();
    snowflakes2D6[i].display();
    snowflakes2D6[i].handleWrapping();
    snowflakes2D6[i].translation();
  }
  // DAY7
  // SNOWFLAKE1
  for (let i = 0; i < snowflakes1D5.length; i++) {
    snowflakes1D5[i].gravity();
    snowflakes1D5[i].display();
    snowflakes1D5[i].handleWrapping();
    snowflakes1D5[i].translation();
  }
  // SNOWFLAKE2
  for (let i = 0; i < snowflakes2D5.length; i++) {
    snowflakes2D5[i].gravity();
    snowflakes2D5[i].display();
    snowflakes2D5[i].handleWrapping();
    snowflakes2D5[i].translation();
  }
}

// setupPlant()
//
// Set the initial position and properties of the Leaves
function setupPlant() {
  // Generate mostly random values for the arguments of the Plant constructor
  for (let i = 0; i < numLeaves; i++) {
    leafX = random(225, 275);
    leafY = random(400, 410);
    leafWidth = random(0, 5);
    leafHeight = random(0, 10);
    leafTheta = random(-PI / 16, PI / 16);
    leafAvatar = leafAvatars[i];
    leafGrowningRate = 1;
    leafMaxHeight = 50;
    // Create a new leaf with the values
    let newLeaf = new Leaves(leafX, leafY, leafWidth, leafHeight, leafTheta, leafAvatar, leafGrowningRate, leafMaxHeight)
    // Add the new leaf to the array
    leaves.push(newLeaf);
  }
}

// displayPlant()
//
// Display the leaves of the plant
function displayPlant() {
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].display();
    leaves[i].grow();
  }
}

// mouseAvatar()
//
// Set an image to be the mouse avatar
// Its position follows mouseX and mouseY
function mouseAvatar() {
  push();
  imageMode(CENTER);
  image(fly, mouseX, mouseY, 35, 35);
  pop();
}

// wallCanvas()
//
// The image acts like a stencil that create a wall like effect
function wallCanvas() {
  push();
  imageMode(CENTER);
  image(windowWall, width / 2, height / 2);
  pop();
}

// timeFramesSetup()
//
// Create all object that are used as time frames
// Rain, NightSky, Snow, and Sun objects
// Store them in an array
function setupTimeFrames() {
  sun0 = new TimeFrames(offsetTargetX + timeFrameInterval * 0, "#42ADF5", translationRate);
  night1 = new TimeFrames(offsetTargetX + timeFrameInterval * 1, color(0), translationRate);
  rain2 = new TimeFrames(offsetTargetX + timeFrameInterval * 2, "#0C9799", translationRate);
  night3 = new TimeFrames(offsetTargetX + timeFrameInterval * 3, color(0), translationRate);
  sun4 = new TimeFrames(offsetTargetX + timeFrameInterval * 4, "#42ADF5", translationRate);
  night5 = new TimeFrames(offsetTargetX + timeFrameInterval * 5, color(0), translationRate);
  snow6 = new TimeFrames(offsetTargetX + timeFrameInterval * 6, "#8FBAC7", translationRate);
  night7 = new TimeFrames(offsetTargetX + timeFrameInterval * 7, color(0), translationRate);
  rain8 = new TimeFrames(offsetTargetX + timeFrameInterval * 8, "#0C9799", translationRate);
  night9 = new TimeFrames(offsetTargetX + timeFrameInterval * 9, color(0), translationRate);

  // Store them in an array
  weather.push(sun0);
  weather.push(night1);
  weather.push(rain2);
  weather.push(night3);
  weather.push(sun4);
  weather.push(night5);
  weather.push(snow6);
  weather.push(night7);
  weather.push(rain8);
  weather.push(night9);
}

// displayTimeFrames()
//
// Display the time frames all at the same setTimeout(function () {
function displayTimeFrames() {
  for (let i = 0; i < weather.length; i++) {
    weather[i].backgroundDisplay();
    weather[i].backgroundTranslation();
  }
}