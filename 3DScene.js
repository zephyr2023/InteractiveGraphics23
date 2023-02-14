let ape;
let cam;
let shiftCamX = 0;
let crazyLine = false;
let sphereY = 0;
let myFont;
let clicked = false;

function preload() {
  ape = loadModel("ape.obj");
  leafs = loadImage("leafs.jpeg");
  dirt = loadImage("dirt.jpeg");
  myFont = loadFont("Deutsch.ttf");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  cam = createCamera();
  ambientMaterial(255, 255, 255);
}

function draw() {
  background(15);
  noStroke();

  // detect spacebar
  if (keyIsDown(32)) {
    shiftCamX++;
    // purple frontlight
    pointLight(140, 0, 140, 0, 0, 40);
    // two ~dramatic~ red lights
    pointLight(50, 0, 0, -500, 180, 500);
    pointLight(50, 0, 0, 500, 180, 500);
    fill(0, 255, 0);
    // text pops up while space held
    if (sphereY < 400) {
      text("SNAKE!", 0, 10);
    }
    // from here on "clicked" boolean is always true
    clicked = true;
    // temporarily true to make fence go craaazy
    crazyLine = true;
    // allows snake to go up and monkey to go down
    sphereY += 3;
  } else {
    // reset camera movement, fence color, and snake/monkey positions
    shiftCamX = 0;
    crazyLine = false;
    sphereY = 0;
  }

  // title text (never moves/disappears)
  textStyle(NORMAL);
  textSize(40);
  textAlign(CENTER);
  textStyle(NORMAL);
  textFont(myFont);
  fill(255);

  if (sphereY < 400) {
    text("Monkey", -60, -30);
    text("versus", 60, -30);
  }

  // after pressing space once control prompt disappears
  if (!clicked) {
    text("...?", 0, 10);
    textSize(20);
    text("(hold space)", 120, 160);
  }

  // green light moves side-to-side while space held
  pointLight(130, 255, 130, sin(shiftCamX / 5) * 50, 0, 0);

  // cam moves side-to-side and slowly back while space held
  cam.setPosition(sin(shiftCamX / 5) * 50, 0, 280 + shiftCamX / 5);
  // cam aims up and down while space held
  cam.lookAt(0, 80 + sin(shiftCamX / 10) * 50, 0);

  // draw leafy ground and dirt square
  push();
  translate(0, 190, 0);
  texture(leafs);
  box(400, 50, 400);
  texture(dirt);
  box(100, 51, 100);
  pop();

  // draw ape
  push();
  translate(0, 165 + sphereY / 15, 0);
  scale(35);
  rotateX(PI);
  ambientMaterial(255, 0, 0);
  model(ape);
  pop();

  // manually-constructed fence
  push();
  noFill();
  // if space held, line changes colors
  crazyLine == true
    ? stroke(random(255), random(255), random(255))
    : stroke(0, 230, 0);
  beginShape();
  vertex(-200, 190, 200);
  vertex(-180, 190, -180);
  vertex(180, 190, -180);
  vertex(200, 190, 200);
  vertex(220, 190, 200);
  vertex(210, 190, -210);
  vertex(-210, 190, -210);
  vertex(-220, 190, 200);
  vertex(-200, 190, 200);
  vertex(-200, 60, 200);
  vertex(-180, 60, -180);
  vertex(-180, 190, -180);
  vertex(180, 190, -180);
  vertex(180, 60, -180);
  vertex(-180, 60, -180);
  vertex(-210, 60, -210);
  vertex(210, 60, -210);
  vertex(180, 60, -180);
  vertex(180, 190, -180);
  vertex(200, 190, 200);
  vertex(200, 60, 200);
  vertex(180, 60, -180);
  vertex(210, 60, -210);
  vertex(220, 60, 200);
  vertex(220, 190, 200);
  vertex(200, 190, 200);
  vertex(200, 60, 200);
  vertex(220, 60, 200);
  vertex(210, 60, -210);
  vertex(-210, 60, -210);
  vertex(-180, 60, -180);
  vertex(-200, 60, 200);
  vertex(-200, 190, 200);
  vertex(-220, 190, 200);
  vertex(-220, 60, 200);
  vertex(-200, 60, 200);
  vertex(-220, 60, 200);
  vertex(-210, 60, -210);
  endShape();
  pop();

  // snake head
  push();
  specularMaterial(0, 255, 0);
  translate(0, 400 - sphereY, 0);
  sphere(140);
  pop();
  // snake eyes
  push();
  specularMaterial(255, 255, 255);
  translate(-70, 320 - sphereY, 50);
  sphere(50);
  translate(140, 0, 0);
  sphere(50);
  pop();
  // snake body
  push();
  fill(255, 255, 255, 180);
  translate(0, 1200 - sphereY, 0);
  cylinder(115, 1600);
  pop();
}
