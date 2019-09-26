let x = 0;
let y = 0;
let tx = 0;
let ty = 100;

function setup() {
  createCanvas(500,500);
}
function draw() {
  background(255);
  x = width * noise(tx);
  y = height * noise(ty);
  tx += random(0, .01);
  ty += random(0, .01);
  ellipse(x,y,100,100);
}
