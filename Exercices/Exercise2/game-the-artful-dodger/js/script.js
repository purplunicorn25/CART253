/******************************************************

Game - The Artful Dodger
Pippin Barr
&
Anne Boutet

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 70;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 60;
let initialEnemySize = enemySize;

// The speed, velocity and acceleration of our enemy circle
let enemySpeed = 5;
let enemyVX = 0;
let enemyAX = .3;

// Enemy enlargement rate
let enemyPlusSize = 5;

// How many dodges the player has made
let dodges = 0;

// The position of the dodges counter
let dodgesX = 20;
let dodgesY = 10;

// Dodges counter make-over
let textSize1 = 60;
let counterFont;

// Background settings
let blueSaturation = 255;
let redSaturation = 255;
let greenSaturation = 255;
// Set how fast the background gets greener
let saturationRate = 17; // At level 15 the background will be green

// Avatar and enemy personnality
let player;
let enemy;

// preload()
//
function preload() {
  // Load Images
  player = loadImage("scaredMonsieur.png");
  enemy = loadImage("cuteBrocoli.png");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);
  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}
// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
 background(redSaturation, greenSaturation, blueSaturation);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }
  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }
  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    // Reset enemy size and enemy speed
    enemySize = initialEnemySize;
    enemySpeed = 5;
    // Set the background back to white
    redSaturation = 255;
    blueSaturation = 255;
    greenSaturation = 255;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    // Reset enemy size and enemy speed
    enemySize = initialEnemySize;
    enemySpeed = 5;
    // Set the background back to white
    redSaturation = 255;
    blueSaturation = 255;
    greenSaturation = 255;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Make the enemy bigger and faster at every dodge
    enemySize = enemySize + enemyPlusSize;
    enemySpeed = enemyVX + enemyAX; //velocity based on acceleration
    console.log(enemySpeed + " ENEMY'S SPEED");
    //Make the green background go darker everytime avatar dodgesX
    redSaturation = redSaturation - saturationRate;
    blueSaturation = blueSaturation - saturationRate;
    background(redSaturation,255,blueSaturation);
  }

// At level 15 the background and the enemy become the same color; only luck counts!
if (dodges >= 16){
  textSize(26)
  text('Luck is a very thin wire\nbetween survival and disaster.', dodgesX + 80, dodgesY);
  textSize(18);
  text('- Hunter S. Thompson -', dodgesX + 80, dodgesY + 65);
}
  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is white with pink Stroke
  stroke("#db24b4");
  strokeWeight(5);
  fill(255)
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);
  // The image follows the player center on center
  imageMode(CENTER);
  image(player, avatarX, avatarY, player.width * .38, player.height * .38);

  // The enemy is green
  noStroke();
  fill(0,255,0);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);
  // The image follows the player center on center
  image(enemy, enemyX, enemyY, enemy.width/12, enemy.height/12);


  // Display dodges counter on screen
  textSize(textSize1);
  fill(255, 0, 0);
  textAlign(LEFT, TOP);
  text(dodges, dodgesX, dodgesY);
}

//Sources:
//cuteBrocoli = https://www.sccpre.cat/
//scaredGirl = https://library.kissclipart.com/
