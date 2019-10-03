let t = 0;
let x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
}

function draw() {
  let y = height * noise(t);
  ellipse(x, y, 10, 10);
  x++;
  t += 0.01;
}
